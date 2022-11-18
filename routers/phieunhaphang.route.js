module.exports = app => {
    const Phieunhaphang = require("../controller/phieunhaphang.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/phieunhaphangAnt100create',verifyToken,Phieunhaphang.savemathang);
    app.use("/api/phieunhaphang",route);
}