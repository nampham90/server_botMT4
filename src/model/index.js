const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//mongoose.set('useFindAndModify', false);

const db = {};

// không liên quan

// không thể xóa
db.user = require("./User")(mongoose);
db.role =require("./role")(mongoose);
db.menu =require("./menu")(mongoose);
db.screenpc =require("./screenpc")(mongoose);
db.phongban =require("./phongban")(mongoose);

db.message = require("./message")(mongoose);
db.nhatkyhethong = require("./nhatkyhethong")(mongoose);
// data co thể xóa
db.demo = require("./demo")(mongoose);

// master không thể xóa
db.tmt030 = require("./tmt030_system")(mongoose);
db.tmt050 = require("./tmt050_name")(mongoose);
db.tmt100 = require("./tmt100_inqno")(mongoose);
db.tmt101 = require("./tmt101_youtube")(mongoose);
db.tmt010_file = require("./tmt010_file")(mongoose);



module.exports = db;