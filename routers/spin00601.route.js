module.exports = app =>{
    const Spin00601 = require("../controller/spin00601.controller");
    const verifyToken = require('../middlewares/verifyToken');
    const router = require("express").Router();

    router.post("/spin00601Ant100XuatHang",verifyToken, Spin00601.xuathang);
    router.post("/spin00601Ant100Xuatnhieudon",verifyToken, Spin00601.xuatnhieudon);
    router.post("/spin00601Ant100Xuatcsv",verifyToken, Spin00601.xuatCSV);


    app.use("/api/spin00601",router);
}