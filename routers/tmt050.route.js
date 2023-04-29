module.exports = app => {
    const TMT050 = require("../controller/tmt050.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post("/tmt050Ant100getListKBN",verifyToken,TMT050.getListKBN);


    app.use("/api/tmt050",route);
}