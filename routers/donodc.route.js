module.exports = app => {
    const Donodc = require("../controller/donodc.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

  //  route.post("/tmt101Ant100Create",verifyToken,TMT101.Create);


    app.use("/api/donodc",route);
}