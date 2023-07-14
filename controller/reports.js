const session = require("express-session");
const {users,rols,rolusers,requirements,rating_technicians} = require("../database/models");
const { Op ,Sequelize} = require("sequelize");
let reportsController = {
    index:async (req,res)=>{
        sess = req.session;
        let myresolves = await requirements.findAll({where: {
            technicianId:sess.idUser,
            [Op.or]: [
                { status: "resolved" },
                { status: "tutorial_sent" },
            ],
        }});
        let mypendings = await requirements.findAll({where: {
            technicianId:sess.idUser,
            [Op.or]: [
                { status: "pending" },
            ],
        }});
        let myrating = await rating_technicians.findAll({include:{model:requirements,where:{technicianId: sess.idUser}}});
        let total = 0;
        myrating.forEach(rat => {
            total += rat.rating;
        });
        let mostRating_result = await rating_technicians.findAll({
            include:[{model: users,attributes:["fullName"],required:true,as:"technician"}]
            ,group:["technicianId"]
            ,attributes: {include: [[Sequelize.fn("AVG", Sequelize.col("rating")), "estrellas"]]}
        });

        let mostResolved_result = await requirements.findAll({
        where: {
            [Op.or]: [
                { status: "resolved" },
                { status: "tutorial_sent" },
            ],
        }
        ,limit:6
        ,group:["requirements.technicianId"]
        ,include:[{model: users,attributes:["fullName"],required:true,as:"technician"}]
        ,attributes: {include: [[Sequelize.fn("COUNT", Sequelize.col("requirements.id")), "cantidad"]]}});
        let mostRating = {tecnicos: [],rating:[]};
        let mostResolved = {tecnicos: [],cantidad:[]};

        mostResolved_result.forEach(a => {
            mostResolved.tecnicos.push(a.technician.dataValues.fullName);
            mostResolved.cantidad.push(a.dataValues.cantidad);
        });
        mostRating_result.forEach(b => {
            mostRating.tecnicos.push(b.technician.dataValues.fullName);
            mostRating.rating.push(parseFloat(b.dataValues.estrellas));
        });
        if(total == 0) myrating = 0;
        if(total != 0) myrating = Math.round((total / myrating.length)*10)/10;

        res.render("./reports",{myresolves:myresolves.length,mypendings: mypendings.length,myrating,mostRating,mostResolved});
    }
}
module.exports = reportsController;