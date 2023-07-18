const db = require("../model");
const Const = require('../common/const');
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const _ = require('lodash');
const dbCon = require('../common/DBConnect');

const User = db.user;
const Menu = db.menu;
const Xe = db.xe;
const Role = db.role;
const Phongban = db.phongban;
const Screenpc = db.screenpc;
//
const Chuyen = db.chuyen;
const ChiphiChuyenxe = db.chiphichuyenxe;
const Phieunhaphang = db.phieunhaphang;
const Hoadonnhaphang = db.hoadonnhaphang;
const Nhatkykh = db.nhatkykh;
const Chuyenngoai = db.chuyenngoai;
const Chitietchuyenngoai = db.chitietchuyenngoai;
const Congnoxengoai = db.congnoxengoai;
const Donhangexportxengoai = db.donhangexportxengoai;
const Donodc = db.donodc;
const Dichvuthuengoai = db.tmt060_dichvuthuengoai;

// master
const Tmt100 = db.tmt100;

// process
const CommonGetListSoidProcess = require("../process/commonProcess/commonGetListSoidProcess");

exports.deleteAllDataMau = async (req,res) => {
   await Chuyen.deleteMany({});
   await ChiphiChuyenxe.deleteMany({});
   await Phieunhaphang.deleteMany({});
   await Hoadonnhaphang.deleteMany({});
   await Nhatkykh.deleteMany({});
   await Chuyenngoai.deleteMany({});
   await Chitietchuyenngoai.deleteMany({});
   await Congnoxengoai.deleteMany({});
   await Donhangexportxengoai.deleteMany({});
   await Donodc.deleteMany({})
   return res.status(200).send(new Response(0,"data delete!", 1));
}

exports.getListSoID = async (req,res) => {
   try {
      const commonGetListSoidProcess = new CommonGetListSoidProcess(dbCon.dbDemo);
      await commonGetListSoidProcess.start();
      const session = commonGetListSoidProcess.transaction;
      let data = await commonGetListSoidProcess.search(req.body,session);
      await commonGetListSoidProcess.commit();
      return res.status(200).send(new Response(0,"Data sucess !", data));
   } catch (error) {
      return res.status(200).send(new Response(1001,"Lỗi hệ thống !", error.message));
   }
}

// tạo số ODN
exports.getODN = async (req,res) => {
   let soODN = "";
   let odn = await Tmt100.findOne({maghep:"ODN"});
   if(odn) {
      // kiểm số winnumber
      let toWinnumber = _.toNumber(odn['winnumber']);
      let toStartnumber = _.toNumber(odn['startnumber']);
      let toEndnumber = _.toNumber(odn['endnumber']);
      if(toWinnumber >= toEndnumber || toWinnumber <= toStartnumber) {
         return res.status(200).send(new Response(1001,"Số ODN đã hết hạn !", null));
      }
      let nowday = commonfun.dateNow();
      nowday = nowday.replace(/\s+/g, '');
      nowday = nowday.replace(/-/g, '');
      soODN = odn['maghep'] + nowday + odn['winnumber'];
      // update winnumber mơi. winnuber + 1;

      let newWinnumber = toWinnumber +1;
      await Tmt100.updateOne({maghep:"ODN"},{$set: {winnumber:_.toString(newWinnumber)}})
      return res.status(200).send(new Response(0,"data !", soODN));
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
      let toWinnumber = _.toNumber(odt['winnumber']);
      let toStartnumber = _.toNumber(odt['startnumber']);
      let toEndnumber = _.toNumber(odt['endnumber']);
      if(toWinnumber >= toEndnumber || toWinnumber <= toStartnumber) {
         return res.status(200).send(new Response(1001,"Số ODT đã hết hạn !", null));
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

exports.getID = async (req,res) => {
   let id = await commonfun.fnGetHDTTXN();
   if(id) {
      return res.status(200).send(new Response(0,"sesuces !", id));
   } else {
      return res.status(200).send(new Response(1001,"null !", null));
   }
}

exports.checkBiensoxe = async (biensoxe) => {
   let xe = await Xe.findOne({biensoxe:biensoxe});
   if(!xe) return "";
   return xe._id;
}

// thông kê tài chinh doanh thu, lợi nhuận , chi phi của từng tháng res => list tứng tháng
exports.listtaichinhthang = async (req,res) => {
   let nam = req.body.nam;
   let listln = [];
   let lnthang1 = await commonfun.tongdoanhthutrongthang(1,nam);
   lnthang1['Thang'] = "Tháng 1";
   let lnthang2 = await commonfun.tongdoanhthutrongthang(2,nam);
   lnthang2['Thang'] = "Tháng 2";
   let lnthang3 = await commonfun.tongdoanhthutrongthang(3,nam);
   lnthang3['Thang'] = "Tháng 3";
   let lnthang4 = await commonfun.tongdoanhthutrongthang(4,nam);
   lnthang4['Thang'] = "Tháng 4";
   let lnthang5 = await commonfun.tongdoanhthutrongthang(5,nam);
   lnthang5['Thang'] = "Tháng 5";
   let lnthang6 = await commonfun.tongdoanhthutrongthang(6,nam);
   lnthang6['Thang'] = "Tháng 6";
   let lnthang7 = await commonfun.tongdoanhthutrongthang(7,nam);
   lnthang7['Thang'] = "Tháng 7";
   let lnthang8 = await commonfun.tongdoanhthutrongthang(8,nam);
   lnthang8['Thang'] = "Tháng 8";
   let lnthang9 = await commonfun.tongdoanhthutrongthang(9,nam);
   lnthang9['Thang'] = "Tháng 9";
   let lnthang10 = await commonfun.tongdoanhthutrongthang(10,nam);
   lnthang10['Thang'] = "Tháng 10";
   let lnthang11 = await commonfun.tongdoanhthutrongthang(11,nam);
   lnthang11['Thang'] = "Tháng 11";
   let lnthang12 = await commonfun.tongdoanhthutrongthang(12,nam);
   lnthang12['Thang'] = "Tháng 12";
   listln.push(lnthang1);
   listln.push(lnthang2);
   listln.push(lnthang3);
   listln.push(lnthang4);
   listln.push(lnthang5);
   listln.push(lnthang6);
   listln.push(lnthang7);
   listln.push(lnthang8);
   listln.push(lnthang9);
   listln.push(lnthang10);
   listln.push(lnthang11);
   listln.push(lnthang12);
   return res.status(200).send(new Response(0,"data", listln));
}

// thông kê tài chính trong năm . gồm doanh thu chi phí . lợi nhuận
exports.thongketaichinhtrongnam = async (req, res) => {
   let nam = req.body.nam;
   let kq = await commonfun.tongdoanhthutrongnam(nam);
   return res.status(200).send(new Response(0,"data", kq));
}

// get tông chuyến hàng trong nam
exports.Tongchuyenhangtrongnam = async (req,res) => {
   let nam = req.body.nam;
   let kq = await commonfun.tongchuyenhangtrongnam(nam);
   return res.status(200).send(new Response(0,"data", kq));
}

// get Tổng nợ tất cả khách hàng 
exports.gettongnoAll = async (req,res) => {
   let idKhachhang = req.body.idKhachhang
   let kq = await commonfun.tongnoAll(idKhachhang);
   //console.log(kq);
   return res.status(200).send(new Response(0,"data", kq));
}

// get tổng nợ của 1 khách hàng
exports.gettongnoUser = async (req,res) => {
   let idKhachhang = req.body.iduser
   let kq = await commonfun.tongno(idKhachhang);
   //console.log(kq);
   return res.status(200).send(new Response(0,"data", kq));
}

// list 10 khach hàng có doanh thu cao nhất trong năm
exports.listtop10khachangcodoanhthucaonhat = async (req,res) => {
   let idkhachhang = Const.idKhachhang;
   let nam = req.body.nam;
   let lstkh = await commonfun.getListtop10khachhangcodoanhthucaonhat(idkhachhang,nam);
   //console.log(lstkh);
   return res.status(200).send(new Response(0, "data", lstkh));
}

// list top chi phi giam dần
exports.listtopchiphicaonhat = async (req, res) => {
   let nam = req.body.nam;
   let lst = await commonfun.getlistchiphigiamdan(nam);
   return res.status(200).send(new Response(0, "data", lst));
}

// list tong cuoc của từng xe tải trong nam
exports.listtongcuoccuatungxetaitrongnam = async (req, res) => {
   let nam = req.body.nam;
   let lst = await commonfun.doanhthucuatungxe(nam);
   let listmegre = [];
   for(let element of lst) {
      if(element._id != null) {
         let item = {
            type: element._id,
            value: element.total
         }
         listmegre.push(item);
      }
   }
   return res.status(200).send(new Response(0, "data", listmegre));
}

// tinh tong nợ xe ngoai
exports.getTongnoxengoai = async (req,res) => {
   let tongno = 0;
   let loinhuan = 0;
   // gồm các đơn chưa thanh toán và các đơn chờ thanh toán
   let lsttongxengoaino = await Congnoxengoai.find({$or : [{status02:0},{status02:1}]})
   .populate({path:'iddonhang',match: { iddonhang: { $ne: null } }});
   if (lsttongxengoaino.length > 0) {
      for(let element of lsttongxengoaino) {
         if(element['iddonhang']){
            if(element['iddonhang']['status03'] == 1) {
               if(element['status01'] = 0) {
                  tongno = tongno + element['sotienno'];
               }
               loinhuan = loinhuan + (element['iddonhang']['tiencuoc']-element['iddonhang']['tiencuocxengoai']);
            }
         } else {
            tongno = tongno + element['sotienno'];
         }
      }
   }
   let resdata = {
      tongno: tongno,
      loinhuan: loinhuan
   }
   return res.status(200).send(new Response(0, "data", resdata));
}


// lấy danh dách dịch vụ xe câu
exports.getListDichVuXeCau = async (req,res) => {
   
   let dsDichvuxecau = await Dichvuthuengoai.find({loaidichvu: Const.idXecau});
   return res.status(200).send(new Response(0, "data sucess !", dsDichvuxecau));

}

// lấy danh dách dịch vụ boc xêp
exports.getListDichVuBocXep = async (req,res) => {
   let dsDichvubocxep = await Dichvuthuengoai.find({loaidichvu: Const.idBocxep});
   return res.status(200).send(new Response(0, "data sucess !", dsDichvubocxep));

}
