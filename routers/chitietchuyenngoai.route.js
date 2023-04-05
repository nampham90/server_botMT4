module.exports = app => {
    const CtChuyenngoai = require("../controller/chitietchuyenngoai.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/chitietchuyenngoaiAnt100GetAll',verifyToken,CtChuyenngoai.PostAll);
    route.post('/chitietchuyenngoaiAnt100PostlistId',verifyToken,CtChuyenngoai.PostUpdateListId);
    route.post('/chitietchuyenngoaiAnt100Get',verifyToken,CtChuyenngoai.GetID);


    app.use("/api/chitietchuyenngoai",route);
}