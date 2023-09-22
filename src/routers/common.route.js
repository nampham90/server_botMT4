module.exports = app => {
    const Common = require("../controller/common.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');


    route.post('/commonAnt100GetODS',verifyToken, Common.getODS);
    route.post('/commonAnt100GetODT',verifyToken, Common.getODT);

    route.post('/commonAnt100getODC', verifyToken, Common.getODC);
    route.post('/commonAnt100getHDTTXN', verifyToken, Common.getHDTTXN);
    route.get('/xacthuctaikhoan/:id',Common.xacthuctaikhoan);

    
    app.use("/api/common",route);
}