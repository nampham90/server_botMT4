module.exports = app => {
    const TaiXe = require("../controller/taixe.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyTaiXe');

    route.post('/taixeAnt100Init', verifyToken, TaiXe.getChuyen);
    route.post('/taixeAnt100Updatestatusorder', verifyToken, TaiXe.Updatestatusorder);
    route.post('/taixeAnt100Updatestatus01', verifyToken, TaiXe.Updatestatus01);
    route.post('/taixeAnt100Insertchiphi', verifyToken, TaiXe.Insertchiphi);
    route.post('/taixeAnt100Updatechiphi', verifyToken, TaiXe.Updatechiphi);
  
    app.use("/api/taixe",route);
}