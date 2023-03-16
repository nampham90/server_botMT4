const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//mongoose.set('useFindAndModify', false);

const db = {};

db.orders = require("./order")(mongoose);
db.account = require("./account")(mongoose);
db.user = require("./User")(mongoose);
db.lenhcho =require("./lenhcho")(mongoose);
db.role =require("./role")(mongoose);
db.menu =require("./menu")(mongoose);
db.screenpc =require("./screenpc")(mongoose);
db.phongban =require("./phongban")(mongoose);
db.xe = require("./xe")(mongoose);
db.chuyen = require("./chuyen")(mongoose);
db.chiphichuyenxe = require("./chiphichuyenxe")(mongoose);
db.phieunhaphang = require("./phieunhaphang")(mongoose);
db.hoadonnhaphang = require("./hoadonnhaphang")(mongoose);
db.nhatkykh = require("./nhatkykh")(mongoose);
db.nhatkyhethong = require("./nhatkyhethong")(mongoose);
db.nguonxe = require("./nguonxe")(mongoose);
db.chuyenngoai = require("./chuyenngoai")(mongoose);
db.chitietchuyenngoai = require("./chitietchuyenngoai")(mongoose);
db.congnoxengoai = require("./congnoxengoai")(mongoose);
db.donhangexportxengoai = require("./donhangexportxengoai")(mongoose);
db.pnhchuyenngoai = require("./pnhchuyenngoai")(mongoose);
db.message = require("./message")(mongoose);

module.exports = db;