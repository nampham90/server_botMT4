module.exports = app => {
    const Kho = require("../khochungcontroller/kho.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/khochungAnt100create',Kho.create);

    app.use("/api/khochung",route);
}