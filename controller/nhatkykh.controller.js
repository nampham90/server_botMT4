const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const axios = require("axios");
const Nhatkykh = db.nhatkykh;
const User = db.user;
const Const = require('../common/const');

exports.getLists = async (req,res) => {
    console.log({userId:req.userID})
    let gt = "01/01/1970";
    let lt = "01/01/2100";
    if(req.body.filters.ngaybatdau) {
        gt = req.body.filters.ngaybatdau;
    }
    if(req.body.filters.ngayketthuc) {
        lt = req.body.filters.ngayketthuc;
    }
    let sreach = {};
    sreach.ngay = {$gte:gt,$lt:lt};
    sreach.trangthai = req.body.filters.trangthai;
    sreach.iduser = req.body.filters.iduser;
    sreach.ghichu = req.body.filters.ghichu;
    console.log(sreach);
    let allData = await Nhatkykh.find(sreach).sort( { "ngay": -1 } )
    .populate('idphieunhaphang')
    if(req.body.pageNum == 0 && req.body.pageSize == 0) {
        res.status(200).send(new Response(0,"data sucess",allData));
    } else {
        let n = 0
        if(req.body.pageNum == 1) {
            n = req.body.pageNum - 1;
        }
        let lst = await Nhatkykh.find(sreach).sort( { "ngay": -1 } )
        .limit(req.body.pageSize).skip(req.body.pageSize*n)
        .populate('idphieunhaphang');
        let data = commonfun.dataReponse(allData,lst,req.body.pageNum,req.body.pageSize);
        res.status(200).send(new Response(0,"data sucess",data));
    }
}

exports.tatToan = async (req,res) => {
    let nth = req.userID;
    console.log(req.body);
    let iduser = req.body.iduser;
    let sotientra = req.body.sotientra;
    await commonfun.ghiNhatkyTatToan(iduser,sotientra);
    await commonfun.ghiNhatkyhethong(nth,"Tất toán nợ cho id " + iduser, "nhatkykh");
    let u = await User.findOne({_id: iduser});
    if(u) {
        console.log(u);
        let content = "Đơn Trả" + "\n" + u.name + " Đã thanh toán số tiền: " + sotientra;
        commonfun.fnSendMessageTelegram(u.groupid, content, axios);
    }

    res.status(200).send(new Response(0,"data sucess",1));
}

exports.thanhtoanmotphan = async (req,res) => {
    let iduser = req.body.iduser;
    let listidpn = req.body.listidpn;
    let i = 0;
    let total = 0;
    let u = await User.findOne({_id: iduser});
    for (let element of listidpn) {
       let n =  await Nhatkykh.updateOne({iduser:iduser, idphieunhaphang: element},{$set: {chukyno:1, ghichu: "Đã thanh toán"}});
       if(n.modifiedCount == 1) {
           i++
           let pn = await Nhatkykh.findOne({iduser:iduser, idphieunhaphang: element});
           total = total + pn.sotien;
       }
    }
    if (i > 0) {
        // tong no con lai
        let noconlai = await commonfun.tongno(iduser);
        let content = "Đơn Trả" + "\n" + u.name + ". Đã thanh toán " + i + " Đơn hàng. Số tiền là: " + total + "\nNợ còn lại: " + noconlai;
        commonfun.fnSendMessageTelegram(u.groupid, content, axios);
        res.status(200).send(new Response(0, "data sucess", 1));
    } else {
        res.status(200).send(new Response(1001,"update fail",null));
    }
}

exports.thanhtoan = async (req,res) => {
    let iduser = req.body.iduser;
    let idphieunhaphang = req.body.idphieunhaphang;
    let u = await User.findOne({_id: iduser});
    let update = await Nhatkykh.updateOne({iduser:iduser,idphieunhaphang:idphieunhaphang},{$set: {chukyno:1, ghichu: "Đã thanh toán"}});
    if(update.modifiedCount == 1) {
        let pn = await Nhatkykh.findOne({iduser:iduser, idphieunhaphang: idphieunhaphang});
        let noconlai = await commonfun.tongno(iduser);
        let content = "Đơn Trả" + "\n" + u.name  + ". Đã thanh toán số tiền: " + pn.sotien + "\nNợ còn lài: " + noconlai;

        commonfun.fnSendMessageTelegram(u.groupid, content, axios);
        res.status(200).send(new Response(0,"data sucess",1));
    } else {
        res.status(200).send(new Response(1001,"update fail",null));
    }
}