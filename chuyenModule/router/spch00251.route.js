//
module.exports = app =>{
    const Spch00251 = require("../controller/spch00251.controller");
    const verifyToken = require('../../middlewares/verifyToken');
    const router = require("express").Router();

    router.post("/spch00251Ant100Huychuyenngoai",verifyToken,Spch00251.huychuyenngoai);
    
    app.use("/api/spch00251",router);
}