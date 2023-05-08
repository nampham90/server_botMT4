const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//mongoose.set('useFindAndModify', false);

const db = {};

// không liên quan
db.orders = require("./order")(mongoose);
db.lenhcho =require("./lenhcho")(mongoose);
db.account = require("./account")(mongoose);
// không thể xóa
db.user = require("./User")(mongoose);
db.role =require("./role")(mongoose);
db.menu =require("./menu")(mongoose);
db.screenpc =require("./screenpc")(mongoose);
db.phongban =require("./phongban")(mongoose);
db.xe = require("./xe")(mongoose);
db.nguonxe = require("./nguonxe")(mongoose);
db.message = require("./message")(mongoose);
db.nhatkyhethong = require("./nhatkyhethong")(mongoose);
// data co thể xóa

db.chuyen = require("./chuyen")(mongoose);
db.chiphichuyenxe = require("./chiphichuyenxe")(mongoose);
db.phieunhaphang = require("./phieunhaphang")(mongoose);
db.hoadonnhaphang = require("./hoadonnhaphang")(mongoose);
db.nhatkykh = require("./nhatkykh")(mongoose);

db.chuyenngoai = require("./chuyenngoai")(mongoose);
db.chitietchuyenngoai = require("./chitietchuyenngoai")(mongoose);
db.congnoxengoai = require("./congnoxengoai")(mongoose);
db.donhangexportxengoai = require("./donhangexportxengoai")(mongoose);

db.pnhchuyenngoai = require("./pnhchuyenngoai")(mongoose);
db.donodc = require("./donodc")(mongoose);

// nhap hang 
db.tin100 = require("./tin100")(mongoose);

// master không thể xóa
db.tmt100 = require("./tmt100")(mongoose);
db.tmt101 = require("./tmt101")(mongoose);
db.tmt050 = require("./tmt050")(mongoose);
db.tmt030 = require("./tmt030")(mongoose);

module.exports = db;