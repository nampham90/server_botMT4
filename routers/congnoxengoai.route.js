module.exports = app => {
    const Congnoxengoai = require("../controller/congnoxengoai.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/congnoxengoaiAnt100GetAll',verifyToken,Congnoxengoai.PostAll);
    app.use("/api/congnoxengoai",route);
}