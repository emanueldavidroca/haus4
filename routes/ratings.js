let express = require('express');
let router = express.Router();
let ratingController = require("../controller/rating");
let userRolValidation = require("../middlewares/userRolValidation");

/* GET users listing. */
router.get("/",userRolValidation("usuario"),ratingController.index);
router.get("/list",ratingController.lista);
router.get("/my",ratingController.mylist);
router.put("/rating_technician/:id",userRolValidation("any"),ratingController.rating_technician);
module.exports = router;
