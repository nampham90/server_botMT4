const dbconfig = require("../config/config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//mongoose.set('useFindAndModify', false);

const db = {};

db.mongoose = mongoose;
db.url = dbconfig.url;
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
db.nhatkytrano = require("./nhatkytrano")(mongoose);
module.exports = db;