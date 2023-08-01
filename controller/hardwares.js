const session = require("express-session");
const { Op } = require("sequelize");
const {users,rols,rolusers,hardwares,hardwares_available,types,categories,tutorials,rating_technicians} = require("../database/models");
let hardwaresController = {
    list:async (req,res) =>{
        try {
            let list_hardwares = await hardwares.findAll({where:{status:"pending"},include:[{model: users,attributes:["fullName"],required:true,as:"user"},{model: users,attributes:["fullName"],required:true,as:"technician"},{model:types, include:[{model:categories}]},{model: hardwares_available,attributes:["hardware_name"],required:true,as:"hardwares_av"}],order:[["priority","DESC"]]});
            res.render("./list_hardwares",{list_hardwares});
        } catch (error) {
            console.log(error);
        }
    },
    resolved_list:async (req,res) =>{
        try {
            let list_hardwares = await hardwares.findAll({where: {
                [Op.or]: [
                    { status: "resolved" },
                    { status: "tutorial_sent" },
                ],
            },include:[{model: users,attributes:["fullName"],required:true,as:"user"}
            ,{model: users,attributes:["fullName"],required:true,as:"technician"},{model:types, include:[{model:categories}]}],order:[["priority","DESC"]]});
            res.render("./resolved_list",{list_hardwares});
        } catch (error) {
            console.log(error);
        }
    },
    create:async (req,res) =>{
        try {
            let technician = await users.findAll({include:{model:rols,where:{rol:"tecnico"}}})
            let categorias = await categories.findAll({include:{model:types}})
            let hardwares_av = await hardwares_available.findAll();
            res.render("./create_hardwares",{technician,categorias,hardwares_av});
        } catch (error) {
            console.log(error)
        }
        
    },
    store:async (req,res) =>{
        try{
            const {hardware,typeId,priority,technicianId} = req.body;
            sess = req.session;
            let result = await hardwares.create({
                hardwaresAvailableId:hardware,typeId,priority,userId:sess.idUser,technicianId
            });
            
            if(result){
                res.redirect("/hardwares/list");
            }
            else{
                res.redirect("/hardwares/create");
            }
        }
        catch(error){

        }
    },
    edit: async(req,res)=>{
        try{
            let dispositivo = await hardwares.findOne({where:{id:req.params.id},include:{model:types, include:[{model:categories}]}});
            let categoria = dispositivo.type.category.dataValues.category;
            let technician = await users.findAll({include:{model:rols,where:{rol:"tecnico"}}})
            let categorias = await categories.findAll({include:{model:types}});
            let hardwares_av = await hardwares_available.findAll();

            res.render("./create_hardwares",{dispositivo,categorias,technician,categoria,hardwares_av});
        }
        catch(e){
            console.log(e)
        } 
    },
    update: async(req,res)=>{
        try{
            let {id} = req.params;

            const {hardware,typeId,priority,technicianId} = req.body;
            sess = req.session;
            let result = await hardwares.update({
                hardwaresAvailableId:hardware,typeId,priority,userId:sess.idUser,technicianId
            },{where:{id}});
            if(result){
                res.redirect("/hardwares/list");
            }else{
                res.redirect("/hardwares/edit/"+id);
            }
        }
        catch(e){
            console.log(e)
        }
    },
    remove: async(req,res)=>{
        try {
            if(req.params.id){
                let remove = hardwares.destroy({where:{id:req.params.id}});
                if(remove){
                    res.redirect("/hardwares/list");
                }
                else{
                    res.redirect("/hardwares/list");
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
    resolveView:async (req,res) =>{
        try {
            let tutoriales = await tutorials.findAll();
            let resolve = await hardwares.findOne({where:{id:req.params.id},include:[{model: users,attributes:["fullName"],required:true,as:"user"},{model: users,attributes:["fullName"],required:true,as:"technician"},{model:types, include:[{model:categories}]}],order:[["priority","DESC"]]});
            res.render("./resolve_hardwares",{resolve,tutoriales});
        } catch (error) {
            
        }
        
    },
    resolved:async (req,res) =>{
        try {
            const {id} = req.params;
            let resolved = await hardwares.findOne({where:{id:req.params.id},include:[{model: users,attributes:["fullName"],required:true,as:"user"},{model: users,attributes:["fullName","id"],required:true,as:"technician"},{model: rating_technicians,attributes:["ratedBy","rating"],required:false},{model:types, include:[{model:categories}]}],order:[["priority","DESC"]]});
            res.render("./resolved",{resolved});
        } catch (error) {
            
        }
        
    },

    resolveStore:async (req,res) =>{
        try{
            const {id} = req.params
            
            if(typeof req.body.send_resolved != "undefined"){
                let data;
                if(typeof req.body.anotation != "undefined" && req.body.anotation.length > 0){
                    data = {status:"resolved",anotation:req.body.anotation}
                }else{
                    data = {status:"resolved"}
                }
                
                let result = await hardwares.update(data,{where:{id}});

                if(result){
                    res.redirect("/hardwares/list");
                }
            }else if(typeof req.body.send_tutorial != "undefined"){
                let data;
                if(typeof req.body.anotation != "undefined" && req.body.anotation.length > 0){
                    data = {anotation:req.body.anotation,}
                }else{
                    data = {status:"tutorial_sent"}
                }

                let result = await hardwares.update(data,{
                    where:{id}
                });
                if(result){
                    res.redirect("/hardwares/list");
                }
            }
            
            else{
                res.redirect("/hardwares/create");
            }
        }
        catch(error){
            console.log(error);
        }
    },
    resolveEdit:async (req,res) =>{
        try{

        }
        catch(error){

        }
    },
    resolveUpdate:async (req,res) =>{
        try{

        }
        catch(error){

        }
    },
}
module.exports = hardwaresController;