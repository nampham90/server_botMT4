const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Const = require('../common/const');
const User = db.user;
const Xe = db.xe;
const Chuyen = db.chuyen;
const Pnh = db.phieunhaphang;
const Chiphi = db.chiphichuyenxe;

exports.getChuyen = async (req, res) => {
    let c = await Chuyen.findOne({idtai: req.userID, trangthai: {$gte:0, $lte : 3}})
    .populate("biensoxe")
    .populate("idtai")
    .populate("idphu");
    let data = {
        resdataChuyen: null,
        reslistHangdi: [],
        reslistHangve: []
    }
    if (c) {
        let countId = c._id.toString().length;
        if (countId == Const.lengthId) {
            data.resdataChuyen = c;
            data.reslistHangdi = await Pnh.find({idchuyen: c._id, lotrinh: Const.hangdi})
            .populate("iduser");
            data.reslistHangve = await Pnh.find({idchuyen: c._id, lotrinh: Const.hangve})
            .populate("iduser");
            return res.status(200).send(new Response(0,"Data sucess", data));
        } else {
            return res.status(200).send(new Response(0,"Data rổng ", []));
        }
    } else {
        return res.status(200).send(new Response(0,"Data rổng ", []));
    }
    
}

exports.Updatestatusorder = async (req,res) => {
    let check = await commonfun.checkOrder(req.body.id, req.userID);
    if (check === true) {
        // update don hang
        await Pnh.updateOne({_id:req.body.id}, {$set: {trangthai: req.body.trangthai}});
        return res.status(200).send(new Response(0,"Update sucess ", 1));
    } else {
        return res.status(200).send(new Response(1010,"Bạn không đủ quyền ", null));
    }
}

// Tài xê chuyên đổi trang thái thừ chưa giao hàng đến -> đã bóc hàng
exports.Updatestatus01 = async (req,res) => {
    if(req.body.mode == "BOCHANG") {
        await Pnh.updateOne({_id:req.body.id}, {$set: {status01: 1}});
    } else if(req.body.mode == "GIAOHANG") {
        await Pnh.updateOne({_id:req.body.id}, {$set: {status01: 2}});
    }
    return res.status(200).send(new Response(0,"Update sucess ", 1));
}

exports.Insertchiphi = async (req,res) => {
    let lstcp = req.body.lstchiphi;
    let id = req.body.id;
    for(let element of lstcp) {
        let cp = new Chiphi({
            idchuyen: id,
            tenchiphi: element.tenchiphi,
            sotien: element.sotien,
            ghichu: element.ghichu
        });
        await cp.save();
    }
    let lcpDB = await Chiphi.find({idchuyen:id});
    if(lcpDB.length > 0) {
       return  res.status(200).send(new Response(0,"thực hiện thành công !", 1));
    } else {
        return res.status(200).send(new Response(1001,"thực hiện không thành công !", 0));
    }
}

exports.Updatechiphi = async (req,res) => {
    let idchuyen = req.body.id;
    let lst = req.body.lstchiphi;
    if(lst.length > 0) {
       let i = 0;
       for(let element of lst) {
         let n = await  Chiphi.updateOne({idchuyen:idchuyen,tenchiphi:element.tenchiphi},{$set: {sotien:element.sotien, ghichu:element.ghichu}});
         if(n.modifiedCount == 1) {
            i++;
         }
       }
       if(i == lst.length) {
          return res.status(200).send(new Response(0,"update sucess ", i));
       } else {
          return res.status(200).send(new Response(0," update 1 phần ", i));
       }
    } else {
        return res.status(200).send(new Response(1001,"Data gửi lên không được chấp nhận ", null));
    }
}

