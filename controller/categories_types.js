const session = require("express-session");
const { Op } = require("sequelize");
const {types,categories} = require("../database/models");
let categoriesTypesController = {
    list: async(req, res) => {
        try {
            let list_categories = await categories.findAll();
            res.render("./list_categories",{list_categories});
        } catch (error) {
            console.log(error);
        }
    },
    create: async(req, res) => {
        let categorias = await categories.findAll({include:{model:types},require:false});
        let types_uncategorized = await types.findAll({where:{categoryId:0}});
        res.render("./create_categoriesTypes",{categorias,types_uncategorized});
    },
    store_type: async(req, res) => {
        let {nameType} = req.body;
        let result = await types.create({type:nameType});
        res.redirect("/categoriesTypes/create");
    },
    store_category: async(req, res) => {
        let {category} = req.body;
        let result = await categories.create({category});
        res.redirect("/categoriesTypes/create");
    },
    assign_types: async(req, res) => {
        await types.update({categoryId:0},{where:{id:{[Op.ne]: null}}});
        
        Object.entries(req.body).forEach(entry => {
            const [key, value] = entry;
            console.log(value);
            value.forEach(tipo => {
                let categoryId = key.split("'");
                types.update({categoryId:categoryId[1]},{where:{id:tipo}}).then((data)=>{});
            });
          });
          setTimeout(()=>{
            res.redirect("/categoriesTypes/create");
          },2000)
    }
}
module.exports = categoriesTypesController;