const session = require("express-session");
const { Op } = require("sequelize");
const {users,rols,rolusers,requirements,types,categories,tutorials,rating_technicians} = require("../database/models");
let requirementsController = {
    list:async (req,res) =>{
        try {
            let list_requirements = await requirements.findAll({where:{status:"pending"},include:[{model: users,attributes:["fullName"],required:true,as:"user"},{model: users,attributes:["fullName"],required:true,as:"technician"},{model:types, include:[{model:categories}]}],order:[["priority","DESC"]]});
            console.log(list_requirements);
            res.render("./list_requirements",{list_requirements});
        } catch (error) {
            console.log(error);
        }
    },
    resolved_list:async (req,res) =>{
        try {
            let list_requirements = await requirements.findAll({where: {
                [Op.or]: [
                    { status: "resolved" },
                    { status: "tutorial_sent" },
                ],
            },include:[{model: users,attributes:["fullName"],required:true,as:"user"}
            ,{model: users,attributes:["fullName"],required:true,as:"technician"},{model:types, include:[{model:categories}]}],order:[["priority","DESC"]]});
            res.render("./resolved_list",{list_requirements});
        } catch (error) {
            console.log(error);
        }
    },
    create:async (req,res) =>{
        try {
            let technician = await users.findAll({include:{model:rols,where:{rol:"tecnico"}}})
            let categorias = await categories.findAll({include:{model:types}})
            res.render("./create_requirements",{technician,categorias});
        } catch (error) {
            
        }
        
    },
    store:async (req,res) =>{
        try{
            const {title,description,typeId,priority,technicianId} = req.body;
            sess = req.session;
            let result = await requirements.create({
                title,description,typeId,priority,userId:sess.idUser,technicianId
            });
            if(result){
                res.redirect("/requirements/list");
            }
            else{
                res.redirect("/requirements/create");
            }
        }
        catch(error){

        }
    },
    edit: async(req,res)=>{
        try{
            let requerimiento = await requirements.findOne({where:{id:req.params.id},include:{model:types, include:[{model:categories}]}});
            let categoria = requerimiento.type.category.dataValues.category;
            let technician = await users.findAll({include:{model:rols,where:{rol:"tecnico"}}})
            let list_hardware = await types.findAll({where:{categoryId:1}});
            let list_software = await types.findAll({where:{categoryId:2}});
            res.render("./create_requirements",{requerimiento,categoria,technician,list_hardware,list_software});
        }
        catch(e){
            console.log(e)
        } 
    },
    update: async(req,res)=>{
        try{
            let {id} = req.params;
            const {title,description,typeId,priority,userId} = req.body;
            let result = await requirements.update({
                title,description,typeId,priority,userId
            },{where:{id}});
            if(result){
                res.redirect("/requirements/list");
            }else{
                res.redirect("/requirements/edit/"+id);
            }
        }
        catch(e){
            console.log(e)
        }
    },
    remove: async(req,res)=>{
        try {
            if(req.params.id){
                let remove = requirements.destroy({where:{id:req.params.id}});
                if(remove){
                    res.redirect("/requirements/list");
                }
                else{
                    res.redirect("/requirements/list");
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
    resolveView:async (req,res) =>{
        try {
            let tutoriales = await tutorials.findAll();
            let resolve = await requirements.findOne({where:{id:req.params.id},include:[{model: users,attributes:["fullName"],required:true,as:"user"},{model: users,attributes:["fullName"],required:true,as:"technician"},{model:types, include:[{model:categories}]}],order:[["priority","DESC"]]});
            res.render("./resolve_requirements",{resolve,tutoriales});
        } catch (error) {
            
        }
        
    },
    resolved:async (req,res) =>{
        try {
            const {id} = req.params;
            let resolved = await requirements.findOne({where:{id:req.params.id},include:[{model: users,attributes:["fullName"],required:true,as:"user"},{model: users,attributes:["fullName","id"],required:true,as:"technician"},{model: rating_technicians,attributes:["ratedBy","rating"],required:false},{model:types, include:[{model:categories}]}],order:[["priority","DESC"]]});
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
                
                let result = await requirements.update(data,{where:{id}});

                if(result){
                    res.redirect("/requirements/list");
                }
            }else if(typeof req.body.send_tutorial != "undefined"){
                let data;
                if(typeof req.body.anotation != "undefined" && req.body.anotation.length > 0){
                    data = {anotation:req.body.anotation,}
                }else{
                    data = {status:"tutorial_sent"}
                }

                let result = await requirements.update(data,{
                    where:{id}
                });
                if(result){
                    res.redirect("/requirements/list");
                }
            }
            
            else{
                res.redirect("/requirements/create");
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
module.exports = requirementsController;