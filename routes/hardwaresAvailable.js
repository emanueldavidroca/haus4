var express = require('express');
var router = express.Router();
let hardwareAvailableController = require("../controller/hardwares_available");
let userRolValidation = require("../middlewares/userRolValidation");

/* GET users listing. */
router.get('/create',hardwareAvailableController.create);
router.post('/create',hardwareAvailableController.store);
router.get('/list',hardwareAvailableController.list);

module.exports = router;
