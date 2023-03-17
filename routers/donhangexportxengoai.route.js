module.exports = app => {
    const Donhangexportxengoai = require("../controller/donhangexportxengoai.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/donhangexportxengoaiAnt100Create',verifyToken,Donhangexportxengoai.postCreate);
    route.post('/donhangexportxengoaiAnt100FindAll',verifyToken,Donhangexportxengoai.PostAll);
    app.use("/api/donhangexportxengoai",route);
}