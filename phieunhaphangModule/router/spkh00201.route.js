module.exports = app => {
    const Spkh00201 = require("../controller/spkh00201.controller");
    const route = require("express").Router();
    const verifyToken = require('../../middlewares/verifyToken');

    route.post('/spkh00201Ant100getAll', verifyToken, Spkh00201.searchListCongNo);
    route.post('/spkh00201Ant100XuatPdf',verifyToken, Spkh00201.xuatPdf)
    route.post('/spkh00201Ant100Thanhtoan',verifyToken, Spkh00201.thanhtoan)
    route.post('/spkh00201Ant100Huythanhtoan',verifyToken, Spkh00201.huythanhtoan)
    route.post('/spkh00201Ant100Phathanhlai',verifyToken, Spkh00201.phathanhlai)
    route.post('/spkh00201Ant100Huyphathanh',verifyToken, Spkh00201.huyphathanh)

    app.use("/api/spkh00201",route);
}