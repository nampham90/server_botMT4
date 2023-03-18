module.exports = app => {
    const Common = require("../controller/common.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/commonAnt100Listloinhanthang',Common.listtaichinhthang);
    route.post('/commonAnt100Thongketaichinhnam',Common.thongketaichinhtrongnam);
    route.post('/commonAnt100Tongchuyenhangtrongnam',Common.Tongchuyenhangtrongnam);
    route.post('/commonAnt100Tongnoall',Common.gettongnoAll);
    route.post('/commonAnt100Listtopdoanhthu', Common.listtop10khachangcodoanhthucaonhat);
    route.post('/commonAnt100Listtopchiphi', Common.listtopchiphicaonhat);
    route.post('/commonAnt100Listtongcuoctungxe', Common.listtongcuoccuatungxetaitrongnam);
    route.post('/commonAnt100GetODS',verifyToken, Common.getODS);
    route.post('/commonAnt100GetODT',verifyToken, Common.getODT);
    route.get('/commonAnt100DeleteAllDataMau', Common.deleteAllDataMau);

    
    app.use("/api/common",route);
}