const { Router } = require("express");

module.exports = app => {
    const Chuyen = require("../controller/chuyen.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/chuyenAnt100getAll',Chuyen.getAllChuyen);
    route.post('/chuyenAnt100create',Chuyen.createChuyen);
    route.put('/chuyenAnt100update',Chuyen.updateChuyen);
    route.get('/chuyenAnt100get/:id',Chuyen.getDetailChuyen);
    route.post('/chuyenAnt100delete',Chuyen.deleteChuyen);
    app.use("/api/chuyen",route);
}