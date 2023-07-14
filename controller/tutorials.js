const session = require("express-session");
const fs = require("fs");
const { unlinkSync } = require('node:fs');
const { Op } = require("sequelize");
const {types,categories,tutorials} = require("../database/models");
let tutorialsController = {
    list:async (req, res) => {
        try {
            let list_tutorials = await tutorials.findAll({include:{model:types}});
            res.render("./list_tutorials",{list_tutorials});
        } catch (error) {
            console.log(error);
        }
        
    },
    create: async(req, res) => {
        let tipos = await types.findAll({});
        res.render("./create_tutorials",{tipos});
    },
    store:async (req, res) => {
        try{
            let {name,tipo} = req.body;

            var imageName = req.file.originalname
            if(!imageName){
                console.log("There was an error")
                res.redirect("/");
            } else {
            fs.createReadStream(req.file.path).pipe(fs.createWriteStream("uploads/"+name+".pdf"));
            /// write file to uploads/fullsize folder
            //unlinkSync(req.file.path);
            let result = await tutorials.create({
                name,path:name+".pdf",typeId:tipo
            });
            res.redirect("/tutorials/list");
            }
        } catch (error) {
            console.log(error);
        }
    },
    remove: async(req,res)=>{
        try {
            if(req.params.id){
                let tutorial = await tutorials.findOne({where:{id:req.params.id}});
                let remove = await tutorials.destroy({where:{id:req.params.id}});
                console.log(tutorial);
                unlinkSync("uploads/"+tutorial.dataValues.path);
                if(remove){
                    res.redirect("/tutorials/list");
                }
                else{
                    res.redirect("/tutorials/list");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = tutorialsController;