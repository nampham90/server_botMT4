module.exports = app => {
    const TMT010 = require("../controller/tmt010_file.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');
    const fileValidator = require('../middlewares/fileValidator');

    route.post("/tmt010Ant100SaveFile",verifyToken,fileValidator, TMT010.saveFile);


    app.use("/api/tmt010",route);
}