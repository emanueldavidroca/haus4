var express = require('express');
var router = express.Router();
let requirementsController = require("../controller/requirements");
let userRolValidation = require("../middlewares/userRolValidation");

/* GET users listing. */
router.get('/create',requirementsController.create);
router.post('/create',requirementsController.store);
router.get('/list',requirementsController.list);
router.get("/edit/:id",userRolValidation("administrador"),requirementsController.edit);
router.put("/edit/:id",userRolValidation("administrador"),requirementsController.update);
router.get("/delete/:id",userRolValidation("administrador"),requirementsController.remove);
router.get("/resolve/:id",userRolValidation("tecnico"),requirementsController.resolveView);
router.put("/resolve/:id",userRolValidation("tecnico"),requirementsController.resolveStore);
router.get("/resolveEdit/:id",userRolValidation("administrador"),requirementsController.resolveEdit);
router.put("/resolveEdit/:id",userRolValidation("administrador"),requirementsController.resolveUpdate);
router.get("/resolved_list/",userRolValidation("administrador"),requirementsController.resolved_list);
router.get("/resolved/:id",userRolValidation("administrador"),requirementsController.resolved);

module.exports = router;
