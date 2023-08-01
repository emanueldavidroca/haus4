var express = require('express');
var router = express.Router();
let chatController = require("../controller/hardwares");
let userRolValidation = require("../middlewares/userRolValidation");

/* GET users listing. */
router.get('/support',chatController.create);

module.exports = router;
