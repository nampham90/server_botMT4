module.exports = app => {
    const TaiXe = require("../controller/taixe.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyTaiXe');

    route.post('/taixeAnt100Init', verifyToken, TaiXe.getChuyen);
    route.post('/taixeAnt100Updatestatusorder', verifyToken, TaiXe.Updatestatusorder);
  
    app.use("/api/taixe",route);
}