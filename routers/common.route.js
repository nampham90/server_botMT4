module.exports = app => {
    const Common = require("../controller/common.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/commonAnt100Listloinhanthang',Common.listtaichinhthang);
    
    app.use("/api/common",route);
}