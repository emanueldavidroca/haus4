var express = require('express');
var router = express.Router();
let hardwaresController = require("../controller/hardwares");
let userRolValidation = require("../middlewares/userRolValidation");

/* GET users listing. */
router.get('/create',hardwaresController.create);
router.post('/create',hardwaresController.store);
router.get('/list',hardwaresController.list);
router.get("/edit/:id",userRolValidation("administrador"),hardwaresController.edit);
router.put("/edit/:id",userRolValidation("administrador"),hardwaresController.update);
router.get("/delete/:id",userRolValidation("administrador"),hardwaresController.remove);
router.get("/resolve/:id",userRolValidation("tecnico"),hardwaresController.resolveView);
router.put("/resolve/:id",userRolValidation("tecnico"),hardwaresController.resolveStore);
router.get("/resolveEdit/:id",userRolValidation("administrador"),hardwaresController.resolveEdit);
router.put("/resolveEdit/:id",userRolValidation("administrador"),hardwaresController.resolveUpdate);
router.get("/resolved_list/",userRolValidation("administrador"),hardwaresController.resolved_list);
router.get("/resolved/:id",userRolValidation("administrador"),hardwaresController.resolved);

module.exports = router;
