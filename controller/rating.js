const session = require("express-session");
const { Op } = require("sequelize");
const {rating_technicians,hardwares,users,types,hardwares_available} = require("../database/models");
let ratingController = {
    index: (req, res) => {
        res.render("./index");
    },
    mylist: async(req, res) => {
        sess = req.session;
        let list_ratings = await rating_technicians.findAll({where:{ratedBy:sess.idUser},include:[{model:hardwares,as:"hardwares",required:true, include:[{model:hardwares_available,as:"hardwares_av"}]},{model:users,as:"technician",required:true}]});
        console.log(list_ratings);
        res.render("./list_myratings",{list_ratings});
    },
    lista: (req, res) => {
        res.render("./list_ratings");
    },
    rating_technician:async (req,res) =>{
        try {
            const {id} = req.params;//el id del hardware
            const {rating_value,technicianId} = req.body;//datos del formulario
            sess = req.session;//session
            let is_rated = await rating_technicians.findOne({where:{hardwareId:req.params.id}});//va a buscar datos de la califacion para saber si ya existe califacion y se debe editar o crear una califacion nueva.
            if(is_rated){//Ya existe, entonces edita la califacion

                let result = await rating_technicians.update({
                    rating:rating_value,ratedBy:sess.idUser,technicianId:technicianId
                },{where:{hardwareId:id}});
            }else{//No existe, la crea
                let result = await rating_technicians.create({
                    rating:rating_value,ratedBy:sess.idUser,hardwareId:id,technicianId:technicianId
                });
            }
            res.redirect("/hardwares/list/");//redirecciona a la lista.
        } catch (error) {
            console.log(error)
        }
        
    },
}

module.exports = ratingController;