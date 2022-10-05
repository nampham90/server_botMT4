module.exports = app => {
    const Chiphichuyenxe = require("../controller/chiphichuyenxe.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    app.use("/api/chiphichuyenxe",route);
}