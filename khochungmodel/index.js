const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//mongoose.set('useFindAndModify', false);
const db = {};
db.kho = require('./kho')(mongoose);
module.exports = db;