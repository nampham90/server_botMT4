module.exports = app => {
    const Nhatkykh = require("../controller/nhatkykh.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/nhatkykhAnt100getAll',verifyToken, Nhatkykh.getLists);
    route.post('/nhatkykhAnt100postTattoan',verifyToken, Nhatkykh.tatToan);

    app.use("/api/nhatkykh",route);
}