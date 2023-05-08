module.exports = app => {
    const Nhatkykh = require("../controller/nhatkykh.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/nhatkykhAnt100getAll',verifyToken, Nhatkykh.getLists);
    route.post('/nhatkykhAnt100postTattoan', Nhatkykh.tatToan);
    route.post('/nhatkykhAnt100postThanhtoanmotphan',verifyToken, Nhatkykh.thanhtoanmotphan);
    route.post('/nhatkykhAnt100postThanhtoan', verifyToken, Nhatkykh.thanhtoan);
    route.post('/nhatkykhAnt100updateStatus05',verifyToken,Nhatkykh.updateStatus05);
    app.use("/api/nhatkykh",route);
}