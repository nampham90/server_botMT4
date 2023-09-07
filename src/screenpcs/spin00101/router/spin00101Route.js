module.exports = app => {
    const Spin00101 = require("../controller/spin00101Controller");
    const route = require("express").Router();
    //const verifyToken = require('../middlewares/verifyToken');

    route.get("/ant100GetUserMsql",Spin00101.getUserMysql);


    app.use("/api/spin00101",route);
}