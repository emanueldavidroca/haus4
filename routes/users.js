var express = require('express');
var router = express.Router();
let usersController = require("../controller/users");
let userRolValidation = require("../middlewares/userRolValidation");

/* GET users listing. */
router.get('/list',userRolValidation("administrador"),usersController.list); //localhost:3001/users/list
router.get("/login",usersController.login);
router.post("/login",usersController.logear);
router.get("/logout",usersController.logout);
router.get("/create",userRolValidation("administrador"),usersController.create);
router.post("/create",userRolValidation("administrador"),usersController.store);
router.get("/edit/:id",userRolValidation("administrador"),usersController.edit);
router.put("/edit/:id",userRolValidation("administrador"),usersController.update);
router.get("/delete/:id",userRolValidation("administrador"),usersController.remove);
router.get("/changePassword",userRolValidation("any"),usersController.changePassword);
router.post("/changePassword",userRolValidation("any"),usersController.newPassword);

module.exports = router;
