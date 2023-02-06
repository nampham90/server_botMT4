module.exports = app => {
    const Nguonxe = require("../controller/nguonxe.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/nguonxeAnt100getAll',verifyToken,Nguonxe.PostAllNguonXe);
    route.post('/nguonxeAnt100getDetail', verifyToken, Nguonxe.PostGetDetail);
    route.post('/nguonxeAnt100Create',verifyToken,Nguonxe.PostCreateNguonXe);
    route.post('/nguonxeAnt100Update',verifyToken,Nguonxe.PostUpdateNguonXe);
    route.post('/nguonxeAnt100Delete',verifyToken,Nguonxe.PostDeleteNguonXe);
    route.post('/nguonxeAnt100DeleteAll',verifyToken,Nguonxe.PostDeleteAllNguonXe);

    app.use("/api/nguonxe",route);
}