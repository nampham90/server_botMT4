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
module.exports = db;