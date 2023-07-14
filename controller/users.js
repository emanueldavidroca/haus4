const session = require("express-session");
const {users,rols,rolusers} = require("../database/models");

let usersController = {
    list:async (req,res) =>{
        let usuarios_habilitados = await users.findAll({where:{active:1}});
        let usuarios_deshabilitados = await users.findAll({where:{active:0}});

        let usuarios = await users.findAll({include:{model:rols}});
        res.render("./list_users",{usuarios,usuarios_habilitados,usuarios_deshabilitados});
    },
    login:(req,res)=>{
        res.render("./login");
    },
    logout:(req,res)=>{
        req.session.destroy((err)=>{
            console.log("destroy");
        });
        res.redirect("/users/login");
    },
    changePassword:(req,res)=>{
        req.session.destroy((err)=>{
            console.log("destroy");
        });
        res.redirect("/users/login");
    },
    newPassword:(req,res)=>{
        req.session.destroy((err)=>{
            console.log("destroy");
        });
        res.redirect("/users/login");
    },
    logear:async (req,res)=>{
        //let sequel = await sequelize.sync({force: true});
        try{
            const {password,email} = req.body;
            let result = await users.findOne({where:{password:password,email:email},include:{model:rols,required:false}});
            if(result){
                sess = req.session;
                sess.email = result.email;
                sess.fullName = result.fullName;
                sess.idUser = result.id;
                if(result.rols.length > 0){
                    sess.rols = result.rols;
                }
                sess.username = result.username;
                console.log(sess)
                req.session.save(function(err) {
                    console.log("saved");
                })
                res.redirect("/");
            }
            else{
                res.render("./login",{error:true});
            }
        }
        catch(e){
            console.log(e);
            //res.redirect("/users/login");
        }

    },
    create:async (req,res)=>{
        try{
            let roles = await rols.findAll();
            if(roles){
                res.render("./create_users",{roles});
            }
        }
        catch(e){
            console.log(e)
            //res.render("/users/create")
        } 
    },
    store:async(req,res)=>{
        try{
            const {username,fullName,password,email,birthDate,roles} = req.body;
            let nuevoUsuario = await users.create({
                username,
                fullName,
                password,
                email,
                birthDate,
            });
            if(nuevoUsuario){
                roles.forEach((r)=>{
                    rolusers.create({userId:nuevoUsuario.dataValues.id,rolId:r})
                    .then((result)=>{
                        console.log(result);
                    })
                });
            }
            res.redirect("/users/list");
        }
        catch(e){
            console.log(e)
        }
        
    },
    edit: async(req,res)=>{
        try{
            let usuario = await users.findOne({where:{id:req.params.id},include:{model:rols}});
            let roles = await rols.findAll();
            let roles_usuario = usuario.rols.map((r) => {return r.dataValues.id});
            if(usuario && roles){
                res.render("./create_users",{usuario,roles,roles_usuario});
            }
        }
        catch(e){
            console.log(e)
        } 
    },
    update: async(req,res)=>{
        try{
            let {id} = req.params;
            const {username,fullName,password,email,birthDate,roles} = req.body;

            let result = await users.update({
                username,
                fullName,
                password,
                email,
                birthDate,
            },{where:{id}});
            if(result){
                rolusers.destroy({where:{userId:id}});
                if(Array.isArray(roles)){
                    roles.forEach((r)=>{
                        rolusers.create({userId:id,rolId:r})
                        .then((result)=>{
                            
                        })
                    });
                }else{
                    rolusers.create({userId:id,rolId:roles})
                    .then((result)=>{
                        
                    })
                }
                res.redirect("/users/list");  
            }
            else{
                res.redirect("/users/edit/"+id);

            }
        }
        catch(e){
            console.log(e)
        }
    },
    remove: async(req,res)=>{
        try {
            if(req.params.id){
                let remove = users.destroy({where:{id:req.params.id}});
                if(remove){
                    res.redirect("/users/list");
                }
                else{
                    res.redirect("/users/list");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = usersController;