const session = require("express-session");
const { Op } = require("sequelize");
const {users,hardwares,types,categories} = require("../database/models");
let indexController = {
    index:async (req, res) => {
        try {
            const moment = require('moment');
            const TODAY_START = moment().format('YYYY-MM-DD 00:00');
            const NOW = moment().format('YYYY-MM-DD 23:59');
            let list_hardwares = await hardwares.findAll({where:{createdAt: {
                [Op.between]: [
                    TODAY_START,
                    NOW,
                ]
            },},include:[{model: users,attributes:["fullName"],required:true,as:"user"},{model: users,attributes:["fullName"],required:true,as:"technician"},{model:types, include:[{model:categories}]}],order:[["priority","DESC"]]});
            res.render("./index",{list_hardwares});
        } catch (error) {
            console.log(error);
        }
        
    },
    login: (req, res) => {
        res.render("./login");
    }
}

module.exports = indexController;