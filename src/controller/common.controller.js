const db = require("../model");
const Const = require('../common/const');
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const _ = require('lodash');

const User = db.user;
const Menu = db.menu;
const Xe = db.xe;
const Role = db.role;
const Phongban = db.phongban;
const Screenpc = db.screenpc;
// master
const Tmt100 = db.tmt100;



// tạo số ODS
exports.getODS = async (req,res) => {
   let soODS = "";
   let ods = await Tmt100.findOne({maghep:"ODS"});
   if(ods) {
      // kiểm số winnumber
      let toWinnumber = _.toNumber(ods['winnumber']);
      let toStartnumber = _.toNumber(ods['startnumber']);
      let toEndnumber = _.toNumber(ods['endnumber']);
      if(toWinnumber >= toEndnumber || toWinnumber <= toStartnumber) {
         return res.status(200).send(new Response(1001,"Số ODS đã hết hạn !", null));
      }
      let nowday = commonfun.dateNow();
      nowday = nowday.replace(/\s+/g, '');
      nowday = nowday.replace(/-/g, '');
      soODS = ods['maghep'] + nowday + ods['winnumber'];
      // update winnumber mơi. winnuber + 1;

      let newWinnumber = toWinnumber +1;
      await Tmt100.updateOne({maghep:"ODS"},{$set: {winnumber:_.toString(newWinnumber)}})
      return res.status(200).send(new Response(0,"data !", soODS));
   } else {
      return res.status(200).send(new Response(1001,"Lỗi chưa thiết lập table tmt100 !", null));
   }
}
// tạo số ODT 
exports.getODT = async (req,res) => {
   let soODT = "";
   let odt = await Tmt100.findOne({maghep:"ODT"});
   if(odt) {
      // kiểm số winnumber
      let toWinnumber = _.toNumber(ods['winnumber']);
      let toStartnumber = _.toNumber(ods['startnumber']);
      let toEndnumber = _.toNumber(ods['endnumber']);
      if(toWinnumber >= toEndnumber || toWinnumber <= toStartnumber) {
         return res.status(200).send(new Response(1001,"Số ODS đã hết hạn !", null));
      }
      let nowday = commonfun.dateNow();
      nowday = nowday.replace(/\s+/g, '');
      nowday = nowday.replace(/-/g, '');
      soODT = odt['maghep'] + nowday + odt['winnumber'];
      // update winnumber mơi. winnuber + 1;
      let newWinnumber = toWinnumber +1;
      await Tmt100.updateOne({maghep:"ODT"},{$set: {winnumber:_.toString(newWinnumber)}})
      return res.status(200).send(new Response(0,"data !", soODT));
   } else {
      return res.status(200).send(new Response(1001,"Lỗi chưa thiết lập table tmt100 !", null));
   }
}

exports.getODC = async (req,res) => {
   let odc = await commonfun.fnGetODC();
   if(odc) {
      return res.status(200).send(new Response(0,"sesuces !", odc));
   } else {
      return res.status(200).send(new Response(1001,"null !", null));
   }
   
}
exports.getHDTTXN = async (req,res) => {
   let hdttxn = await commonfun.fnGetHDTTXN();
   if(hdttxn) {
      return res.status(200).send(new Response(0,"sesuces !", hdttxn));
   } else {
      return res.status(200).send(new Response(1001,"null !", null));
   }
}














