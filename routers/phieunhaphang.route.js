module.exports = app => {
    const Phieunhaphang = require("../controller/phieunhaphang.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    app.use("/api/phieunhaphang",route);
}