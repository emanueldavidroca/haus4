let express = require('express');
let router = express.Router();
let indexController = require("../controller/index");
let userRolValidation = require("../middlewares/userRolValidation");

/* GET users listing. */
router.get("/",userRolValidation("any"),indexController.index);


module.exports = router;
