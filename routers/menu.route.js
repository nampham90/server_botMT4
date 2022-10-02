module.exports = app => {
    const Menu = require("../controller/menu.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.get("/ant100SearchFatherMenu",Menu.getListDept);
    route.post("/ant100AddMenu",Menu.addMenu)
    route.put("/ant100EditMenu",Menu.editMenu)
    route.post("/ant100DelMenu",Menu.delMenu)
    route.post("/ant100PostDetailMenu",Menu.getDetailMenu);
    route.post("/ant100ListMenu",Menu.getListMenu);
    route.post("/ant100ListMenuParams",Menu.getListMenuParams);
    route.post("/ant100PostUrlParams",Menu.getDetailMenuFromUrl)

    app.use("/api/menu",route);
}