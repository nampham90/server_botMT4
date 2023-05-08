const { Router } = require("express");

module.exports = app => {
    const Chuyen = require("../controller/chuyen.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/chuyenAnt100getAll',verifyToken,Chuyen.getAllChuyen);
    route.post('/chuyenAnt100create',verifyToken,Chuyen.createChuyen);
    route.put('/chuyenAnt100update',verifyToken,Chuyen.updateChuyen);
    route.get('/chuyenAnt100get/:id',verifyToken,Chuyen.getDetailChuyen);
    route.post('/chuyenAnt100delete',verifyToken,Chuyen.deleteChuyen);
    route.post('/chuyenAnt100updateTrangthai', verifyToken, Chuyen.updateTrangthai);
    route.post('/chuyenAnt100searchParams',verifyToken,Chuyen.searchParams);
    app.use("/api/chuyen",route);
}