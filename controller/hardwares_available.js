const session = require("express-session");
const { Op } = require("sequelize");
const {users,rols,rolusers,hardwares,hardwares_available,types,categories,tutorials,rating_technicians} = require("../database/models");
let hardwaresController = {
    create:async (req,res) =>{
        try {
            let hardwares_av = await hardwares_available.findAll();
            let tipos = await types.findAll();
            res.render("./create_hardwares_available",{hardwares_av,tipos});
        } catch (error) {
            console.log(error)
        }
        
    },
    store:async (req,res) =>{
        try{
            const {hardware_name,typeId,startingColdTemp,startingWarmTemp} = req.body;
            if(hardware_name.length > 0 && typeId > 0){
                sess = req.session;
                let result = await hardwares_available.create({
                    hardware_name,typeId,startingColdTemp,startingWarmTemp
                });
                if(result){
                    res.redirect("/hardwaresAvailable/list");
                }
                else{
                    res.redirect("/hardwaresAvailable/create");
                }
            }
            else{
                res.redirect("/hardwaresAvailable/create");
            }
        }
        catch(error){

        }
    },
    list:async (req,res) =>{
        try {
            let list_hardwares_available = await hardwares_available.findAll({include:[{model:types,as:"type", include:[{model:categories}]}]});
            res.render("./list_hardwares_available",{list_hardwares_available});
        } catch (error) {
            console.log(error);
        }
    },
}
module.exports = hardwaresController;