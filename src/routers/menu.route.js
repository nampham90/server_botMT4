module.exports = app => {
    const Menu = require("../controller/menu.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.get("/ant100SearchFatherMenu",verifyToken,Menu.getListDept);
    route.post("/ant100AddMenu",verifyToken,Menu.addMenu)
    route.put("/ant100EditMenu",verifyToken,Menu.editMenu)
    route.post("/ant100DelMenu",verifyToken,Menu.delMenu)
    route.post("/ant100PostDetailMenu",verifyToken,Menu.getDetailMenu);
    route.post("/ant100ListMenu",verifyToken,Menu.getListMenu);
    route.post("/ant100ListMenuParams",verifyToken,Menu.getListMenuParams);
    route.post("/ant100PostUrlParams",verifyToken,Menu.getDetailMenuFromUrl)

    app.use("/api/menu",route);
}