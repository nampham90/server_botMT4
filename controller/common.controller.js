const db = require("../model");
const Const = require('../common/const');
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
