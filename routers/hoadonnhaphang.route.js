module.exports = app => {
    const Hoadonnhaphang = require("../controller/hoadonnhaphang.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    app.use("/api/hoadonnhaphang",route);
}