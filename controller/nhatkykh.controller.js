const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const axios = require("axios");
const _ = require('lodash');
const Nhatkykh = db.nhatkykh;
const User = db.user;
const Ctchuyenngoai = db.chitietchuyenngoai;
const Donodc = db.donodc;
const Const = require('../common/const');

exports.getLists = async (req,res) => {
    let filters = req.body.filters;
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
    if(filters.trangthai) {
        sreach.trangthai = filters.trangthai;
    }
    if(filters.iduser) {
        sreach.iduser = filters.iduser;
    }
    if(filters.ghichu) {
        sreach.ghichu = filters.ghichu;
    }
    if(filters.status05) {
        sreach.status05 = { $regex: new RegExp(filters.status05 + "$") }
    } else {
        sreach.status05 = "";
    }
    let allData = await Nhatkykh.find(sreach).sort( { "ngay": -1 } )
    .populate('idphieunhaphang')
    if(req.body.pageNum == 0 && req.body.pageSize == 0) {
        res.status(200).send(new Response(0,"data sucess",allData));
    } else {
        let n = req.body.pageNum - 1;
        let lst = await Nhatkykh.find(sreach).sort( { "ngay": -1 } )
        .limit(req.body.pageSize).skip(req.body.pageSize*n)
        .populate('idphieunhaphang');
        let lstmegre = [];
        for(let element of lst) {
            if(element['idphieunhaphang'] == null && element['status01'].length > 0) {
                const str =  element['status01']
                const result = str.slice(0, 24);
                let ctchuyenngoai = await Ctchuyenngoai.findOne({_id:result})
                .populate('nguonxe');
                let item = {
                    chukyno: element['chukyno'],
                    createdAt:element['createdAt'],
                    ghichu:element['ghichu'],
                    hinhthucthanhtoan:element['hinhthucthanhtoan'] ,
                    id:element['id'] ,
                    idchuyen:element['idchuyen'] ,
                    idphieunhaphang: ctchuyenngoai,
                    iduser:element['iduser'] ,
                    ngay:element['ngay'] ,
                    sotien:element['sotien'] ,
                    status01:element['status01'] ,
                    status02:element['status02'] ,
                    status03:element['status03'],
                    status04:element['status04'] ,
                    status05:element['status05'] ,
                    trangthai:element['trangthai'],
                    updatedAt:element['updatedAt']
                }
                lstmegre.push(item);
            } else {
                lstmegre.push(element);
            }
        }
        let data = commonfun.dataReponse(allData,lstmegre,req.body.pageNum,req.body.pageSize);
        res.status(200).send(new Response(0,"data sucess",data));
    }
}

exports.tatToan = async (req,res) => {
    let nth = req.userID;
    let iduser = req.body.iduser;
    let sotientra = req.body.sotientra;
    await commonfun.ghiNhatkyTatToan(iduser,sotientra);
    await commonfun.ghiNhatkyhethong("system","Tất toán nợ",nth,"update", "nhatkykh");
    let u = await User.findOne({_id: iduser});
    if(u) {
        console.log(u);
        let content = "Đơn Trả" + "\n" + u.name + " Đã thanh toán số tiền: " + sotientra;
        commonfun.fnSendMessageTelegram(u.groupid, content, axios);
    }

    res.status(200).send(new Response(0,"data sucess",1));
}

exports.thanhtoanmotphan = async (req,res) => {
    let nth = req.userID;// người thực hiện
    let iduser = req.body.iduser;
    let listidpn = req.body.listidpn;
    let soodc = req.body.soodc;
    let i = 0;
    let total = 0;
    let u = await User.findOne({_id: iduser});
    for (let element of listidpn) {
        if(element.length == 24) {
            let n =  await Nhatkykh.updateOne({iduser:iduser, idphieunhaphang: element},{$set: {chukyno:1, ghichu: "Đã thanh toán"}});
            if(n.modifiedCount == 1) {
                i++
                let pn = await Nhatkykh.findOne({iduser:iduser, idphieunhaphang: element});
                total = total + pn.sotien;
            }
        } else {
            let n =  await Nhatkykh.updateOne({iduser:iduser, status01: { $regex: new RegExp(element, 'i') }},{$set: {chukyno:1, ghichu: "Đã thanh toán"}});
            if(n.modifiedCount == 1) {
                i++
                let pn = await Nhatkykh.findOne({iduser:iduser, status01: { $regex: new RegExp(element, 'i') }});
                total = total + pn.sotien;
            }
        }
    }
    if (i > 0) {
        // tong no con lai
        let noconlai = await commonfun.tongno(iduser);
        let content = "Đơn Trả" + "\n" + u.name + ". Đã thanh toán " + i + " Đơn hàng. Số tiền là: " + total + "\nNợ còn lại: " + noconlai;
        commonfun.fnSendMessageTelegram(u.groupid, content, axios);
        // update donodc status01 = 1;
        await Donodc.updateOne({soodc:soodc},{$set: {status01:1}});
        // ghi nhật ký hệ thống
        await commonfun.ghiNhatkyhethong("system","Khách hàng thanh toán dơn hàng Số ODC:" + soodc, nth, "update", "nhatkykh");
        res.status(200).send(new Response(0, "data sucess", 1));
    } else {
        res.status(200).send(new Response(1001,"update fail",null));
    }
}

exports.thanhtoan = async (req,res) => {
    let iduser = req.body.iduser;
    let idphieunhaphang = req.body.idphieunhaphang;
    let u = await User.findOne({_id: iduser});
    if(req.body.status01) {
        let update = await Nhatkykh.updateOne({iduser:iduser, status01: { $regex: new RegExp(req.body.status01, 'i') }},{$set: {chukyno:1, ghichu: "Đã thanh toán"}});
        if(update.modifiedCount == 1) {
            let pn = await Nhatkykh.findOne({iduser:iduser, status01: { $regex: new RegExp(req.body.status01, 'i') }});
            let noconlai = await commonfun.tongno(iduser);
            let content = "Đơn Trả" + "\n" + u.name  + ". Đã thanh toán số tiền: " + pn.sotien + "\nNợ còn lài: " + noconlai;
            console.log(content);
            commonfun.fnSendMessageTelegram(u.groupid, content, axios);
            res.status(200).send(new Response(0,"data sucess",1));
        } else {
            res.status(200).send(new Response(1001,"update fail",null));
        }
    } else {
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
}
// cập nhật số odc cho đơn hàng. chuyển sang trạng thái chờ thanh toán
exports.updateStatus05 = async (req,res) => {
    let lstId = req.body.lstId;
    let i = 0;
    for(let element of lstId) {
        await Nhatkykh.updateOne({_id:element},{$set : {status05:req.body.soodc}});
        i++;
    }
    if(i == lstId.length) {
        // tạo đơn odc
        let newDonodc = new Donodc({
            idkhachhang: req.body.idkhachhang,
            lstId: req.body.lstId,
            tongcuoc: req.body.tongcuoc,
            soodc: req.body.soodc,
            ngayxuat: _.now(),
            ngaythanhtoan: null,
            status01: 0, //0 donodc chờ thanh toan, 1 đã thanh toán
            status02: 0, 
            status03: 0, 
            status04: 0,
            status05: 0
        });
        await newDonodc.save();
        return  res.status(200).send(new Response(0,"data sucess",1));
    } else{
        return  res.status(200).send(new Response(1001,"update fail",null));
    }

}