var express = require('express');
var router = express.Router();
let categoriesTypesController = require("../controller/categories_types");
let userRolValidation = require("../middlewares/userRolValidation");

/* GET users listing. */
router.get('/list',categoriesTypesController.list);
router.get('/create',categoriesTypesController.create);
router.post('/create_type',categoriesTypesController.store_type);
router.post('/create_category',categoriesTypesController.store_category);
router.post('/assign_types',categoriesTypesController.assign_types);
module.exports = router;
