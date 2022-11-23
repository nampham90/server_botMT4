module.exports = app => {
    const Xe = require("../controller/xe.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/xeAnt100getAll',verifyToken,Xe.PostAllXe);
    route.post('/xeAnt100create',verifyToken,Xe.CreateXe);
    route.get('/xeAnt100get/:id',verifyToken,Xe.getDetail);
    route.post('/xeAnt100updateTrangthai',verifyToken, Xe.Updatetrangthai)

    app.use("/api/xe",route);
}