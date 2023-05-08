
module.exports = app => {
    const TMT030 = require("../controller/tmt030.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post("/tmt030Ant100getSYSFLG",verifyToken,TMT030.getSYSFLG);


    app.use("/api/tmt030",route);
}