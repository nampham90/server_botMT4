module.exports = app => {
    const Chuyenngoai = require("../controller/chuyenngoai.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/chuyenngoaiAnt100getAll',verifyToken,Chuyenngoai.PostAllChuyenngoai);
    route.post('/chuyenngoaiAnt100getDetail', verifyToken, Chuyenngoai.PostGetDetail);
    route.post('/chuyenngoaiAnt100Create',verifyToken,Chuyenngoai.PostCreateChuyenngoai);
    route.post('/chuyenngoaiAnt100Update',verifyToken,Chuyenngoai.PostUpdateChuyenngoai);
    route.post('/chuyenngoaiAnt100UpdateStatus',verifyToken,Chuyenngoai.PostUpdateStatusChuyenngoai);
    route.post('/chuyenngoaiAnt100Delete',verifyToken,Chuyenngoai.PostDeleteChuyenngoai);
    route.post('/chuyenngoaiAnt100DeleteAll',verifyToken,Chuyenngoai.PostDeleteAllChuyenngoai);

    app.use("/api/chuyenngoai",route);
}