module.exports = app =>{
    const Spch00201 = require("../controller/spch00201.controller");
    const verifyToken = require('../../middlewares/verifyToken');
    const router = require("express").Router();

    router.post("/spch00201Ant100UpdateTiencuocSoID",verifyToken,Spch00201.updateTiencuocSoID);

    app.use("/api/spch00201",router);
}