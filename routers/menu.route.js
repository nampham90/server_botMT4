module.exports = app => {
    const Menu = require("../controller/menu.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.get("/ant100SearchFatherMenu",Menu.getListDept);

    app.use("/api/menu",route);
}