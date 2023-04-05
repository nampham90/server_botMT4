module.exports = app => {
    const Nhatkyhethong = require("../controller/nhatkyhethong.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/nhatkyhethongAnt100getAll',verifyToken, Nhatkyhethong.getListsType);

    app.use("/api/nhatkyhethong",route);
}