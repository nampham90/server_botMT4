module.exports = app =>{
    const Spkh00301 = require("../controller/spkh00301.controller");
    const verifyToken = require('../middlewares/verifyToken');
    const router = require("express").Router();

    router.post("/spkh00301Ant100Search",verifyToken,Spkh00301.search);
    
    app.use("/api/spkh00301",router);
}