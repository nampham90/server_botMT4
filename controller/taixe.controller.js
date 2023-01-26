const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Const = require('../common/const');
const User = db.user;
const Xe = db.xe;
const Chuyen = db.chuyen;
const Pnh = db.phieunhaphang;

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
    console.log();
    if (c) {
        let countId = c._id.toString().length;
        if (countId == Const.lengthId) {
            data.resdataChuyen = c;
            data.reslistHangdi = await Pnh.find({idchuyen: c._id, lotrinh: Const.hangdi});
            data.reslistHangve = await Pnh.find({idchuyen: c._id, lotrinh: Const.hangve});
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

