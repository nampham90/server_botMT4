module.exports = app => {
    const Nhatkykh = require("../controller/nhatkykh.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    //route.post('',verifyToken, Nhatkykh.ghiNhatky);

    app.use("/api/nhatkykh",route);
}