module.exports = app => {
    const Phieunhaphang = require("../controller/phieunhaphang.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/phieunhaphangAnt100create', verifyToken, Phieunhaphang.savemathang);
    route.post('/phieunhaphangAnt100getAll', verifyToken, Phieunhaphang.getLists);
    route.get('/phieunhaphangAnt100get/:id', verifyToken, Phieunhaphang.getDetail)
    route.put('/phieunhaphangAnt100update', verifyToken, Phieunhaphang.update);
    route.post('/phieunhaphangAnt100delete',verifyToken, Phieunhaphang.delete);
    route.post('/phieunhaphangAnt100ExportDataPDFChuyen',verifyToken, Phieunhaphang.ExportDataPDFChuyen);
    app.use("/api/phieunhaphang",route);
}