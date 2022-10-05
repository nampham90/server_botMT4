module.exports = app => {
    const Xe = require("../controller/xe.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    app.use("/api/xe",route);
}