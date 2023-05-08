module.exports = app =>{
    const Spch00201 = require("../controller/spch00201.controller");
    const verifyToken = require('../middlewares/verifyToken');
    const router = require("express").Router();

    router.post("/spch00201Ant100UpdateTiencuocxenha",verifyToken,Spch00201.updateTiencuocxenha);
    router.post("/spch00201Ant100UpdateTiencuocxengoai",verifyToken,Spch00201.updateTiencuocxengoai);
    
    app.use("/api/spch00201",router);
}