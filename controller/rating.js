const session = require("express-session");
const { Op } = require("sequelize");
const {rating_technicians,requirements,users,types} = require("../database/models");
let ratingController = {
    index: (req, res) => {
        res.render("./index");
    },
    mylist: async(req, res) => {
        sess = req.session;
        let list_ratings = await rating_technicians.findAll({where:{technicianId:sess.idUser},include:[{model:requirements,required:true},{model:users,as:"user",required:true}]});
        res.render("./list_myratings",{list_ratings});
    },
    lista: (req, res) => {
        res.render("./list_ratings");
    },
    rating_technician:async (req,res) =>{
        try {
            const {id} = req.params;
            const {rating_value,technicianId} = req.body;
            sess = req.session;
            let is_rated = await rating_technicians.findOne({where:{requirementId:req.params.id}});
            if(is_rated){
                let result = await rating_technicians.update({
                    rating:rating_value,ratedBy:sess.idUser,technicianId:technicianId
                },{where:{requirementId:id}});
                console.log(result);
            }else{
                let result = await rating_technicians.create({
                    rating:rating_value,ratedBy:sess.idUser,requirementId:id,technicianId:technicianId
                });
                console.log(result);
                console.log(req.body);
                console.log(req.params);
            }
            res.redirect("/requirements/resolved/"+id);
        } catch (error) {
            console.log(error)
        }
        
    },
}

module.exports = ratingController;