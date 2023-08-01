const session = require("express-session");
const { Op } = require("sequelize");
const {users,rols,rolusers,hardwares,hardwares_available,types,categories,tutorials,rating_technicians} = require("../database/models");
let chatController = {
    support:async (req,res) =>{
        try {
            let hardwares_av = await hardwares_available.findAll();
            let tipos = await types.findAll();
            res.render("./create_hardwares_available",{hardwares_av,tipos});
        } catch (error) {
            console.log(error)
        }
        
    },
}
module.exports = chatController;