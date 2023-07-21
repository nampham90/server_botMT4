module.exports = app =>{
    const Khachhang = require("../controller/spkh00101getlists.controller");
    const verifyToken = require('../../middlewares/verifyToken');
    const router = require("express").Router();

    router.post('/khachhangAnt100getAll',verifyToken,Khachhang.getLists);
    // router.post('/khachhangAnt100searchParams',verifyToken,Khachhang.searchParams);
    // router.get('/khachhangAnt100getDetail/:id',verifyToken, Khachhang.getDetail);
    // router.put('/khachhangAnt100update',verifyToken,Khachhang.update);
    app.use("/api/khachhang",router);
}