const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Chuyen = db.chuyen;
const User = db.user;
const Menu = db.menu;
const Xe = db.xe;
const Role = db.role;
const Phongban = db.phongban;
const Screenpc = db.screenpc;
const ChiphiChuyenxe = db.chiphichuyenxe;
const Phieunhaphang = db.phieunhaphang;
const Hoadonnhaphang = db.hoadonnhaphang;
const Nhatkytrano = db.nhatkytrano;

exports.checkBiensoxe = async (biensoxe) => {
   let xe = await Xe.findOne({biensoxe:biensoxe});
   if(!xe) return "";
   return xe._id;
}
