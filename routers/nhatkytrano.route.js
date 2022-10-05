module.exports = app => {
    const Nhatkytrano = require("../controller/nhatkytrano.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    app.use("/api/nhatkytrano",route);
}