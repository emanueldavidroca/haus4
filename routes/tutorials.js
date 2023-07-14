var express = require('express');
var router = express.Router();
let tutorialsController = require("../controller/tutorials");
let userRolValidation = require("../middlewares/userRolValidation");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/temp' })
/* GET users listing. */
router.get('/list',tutorialsController.list);
router.get('/create',tutorialsController.create);
router.post('/create', upload.single('archivo'),tutorialsController.store);
router.get('/delete/:id',tutorialsController.remove);
module.exports = router;
