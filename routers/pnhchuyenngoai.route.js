module.exports = app => {
    const Pnhchuyenngoai = require("../controller/pnhchuyenngoai.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/pnhchuyenngoaiAnt100getAll',verifyToken, Pnhchuyenngoai.PostAllPnhchuyenngoai);
    route.post('/pnhchuyenngoaiAnt100getDetail', verifyToken, Pnhchuyenngoai.PostGetDetail);
    route.post('/pnhchuyenngoaiAnt100Create',verifyToken, Pnhchuyenngoai.PostCreatePnhchuyenngoai);
    route.post('/pnhchuyenngoaiAnt100Update',verifyToken, Pnhchuyenngoai.PostUpdatePnhchuyenngoai);
    route.post('/pnhchuyenngoaiAnt100UpdateStatus',verifyToken, Pnhchuyenngoai.PostUpdateStatusPnhchuyenngoai);
    route.post('/pnhchuyenngoaiAnt100Delete',verifyToken, Pnhchuyenngoai.PostDeletePnhchuyenngoai);
    route.post('/pnhchuyenngoaiAnt100DeleteAll',verifyToken, Pnhchuyenngoai.PostDeleteAllPnhchuyenngoai);

    app.use("/api/pnhchuyenngoai",route);
}