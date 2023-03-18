module.exports = app => {
    const Donhangexportxengoai = require("../controller/donhangexportxengoai.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/donhangexportxengoaiAnt100Create',verifyToken,Donhangexportxengoai.postCreate);
    route.post('/donhangexportxengoaiAnt100FindAll',verifyToken,Donhangexportxengoai.PostAll);
    route.post('/donhangexportxengoaiAnt100Detail',verifyToken,Donhangexportxengoai.PostDetail);
    route.post('/donhangexportxengoaiAnt100UpdateStatus',verifyToken,Donhangexportxengoai.PostUpdateStatus);

    app.use("/api/donhangexportxengoai",route);
}