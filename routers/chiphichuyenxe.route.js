module.exports = app => {
    const Chiphichuyenxe = require("../controller/chiphichuyenxe.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/chiphichuyenAnt100getAll', verifyToken, Chiphichuyenxe.getLists)
    route.post('/chiphichuyenAnt100updateList', verifyToken, Chiphichuyenxe.updateLists)

    app.use("/api/chiphichuyen",route);
}