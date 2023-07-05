module.exports = app => {
    const TMT050 = require("../controller/tmt050.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post("/tmt050Ant100getListKBN",verifyToken,TMT050.getListKBN);
    route.post("/tmt050Ant100getDetail",verifyToken,TMT050.getDetail);
    route.post("/tmt050Ant100update",verifyToken,TMT050.update);
    route.post("/tmt050Ant100delete",verifyToken,TMT050.delete);


    app.use("/api/tmt050",route);
}