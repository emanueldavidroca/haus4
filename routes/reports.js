let express = require('express');
let router = express.Router();
let reportsController = require("../controller/reports");
let userRolValidation = require("../middlewares/userRolValidation");

/* GET users listing. */
router.get("/",userRolValidation("any"),reportsController.index);
module.exports = router;
