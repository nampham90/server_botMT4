module.exports = app => {
    const Common = require("../controller/common.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post('/commonAnt100Listloinhanthang',verifyToken,Common.listtaichinhthang);
    route.post('/commonAnt100Thongketaichinhnam',verifyToken,Common.thongketaichinhtrongnam);
    route.post('/commonAnt100Tongchuyenhangtrongnam',verifyToken,Common.Tongchuyenhangtrongnam);
    route.post('/commonAnt100Tongnoall',verifyToken,Common.gettongnoAll);
    route.post('/commonAnt100Tongnouser',verifyToken,Common.gettongnoUser);
    route.post('/commonAnt100Listtopdoanhthu',verifyToken, Common.listtop10khachangcodoanhthucaonhat);
    route.post('/commonAnt100Listtopchiphi', verifyToken,Common.listtopchiphicaonhat);
    route.post('/commonAnt100Listtongcuoctungxe',verifyToken, Common.listtongcuoccuatungxetaitrongnam);
    route.post('/commonAnt100GetODS',verifyToken, Common.getODS);
    route.post('/commonAnt100GetODT',verifyToken, Common.getODT);
    route.get('/commonAnt100DeleteAllDataMau', Common.deleteAllDataMau);
    route.post('/commonAnt100Tongnoxengoai', verifyToken, Common.getTongnoxengoai);
    route.post('/commonAnt100getODC', verifyToken, Common.getODC);
    route.post('/commonAnt100getHDTTXN', verifyToken, Common.getHDTTXN);
    route.post('/commonAnt100getID', verifyToken, Common.getID);
    route.post('/commonAnt100getListSoID',verifyToken, Common.getListSoID);
    route.post('/commonAnt100GetListDichvuXeCau',verifyToken, Common.getListDichVuXeCau);
    route.post('/commonAnt100GetListDichvuBocXep',verifyToken, Common.getListDichVuBocXep);

    app.use("/api/common",route);
}