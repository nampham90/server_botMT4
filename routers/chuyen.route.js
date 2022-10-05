module.exports = app => {
    const Chuyen = require("../controller/chuyen.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    app.use("/api/chuyen",route);
}