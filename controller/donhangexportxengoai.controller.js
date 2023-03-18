const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const _ = require('lodash');
const Chuyenngoai = db.chuyenngoai;
const Chitietchuyenngoai = db.chitietchuyenngoai;
const Congnoxengoai = db.congnoxengoai;
const Nhatkykh = db.nhatkykh;
const Donhangexportxengoai = db.donhangexportxengoai;

exports.PostAll = async (req,res) => {
    if(req.body.pageSize == 0 && req.body.pageNum == 0) {
        let alldata = await Donhangexportxengoai.find({})
        .populate('nguonxe')
        return res.status(200).send(new Response(0,"Data sucess", alldata));
    } else {
        let n = req.body.pageNum - 1;
        let alldata = await Donhangexportxengoai.find(req.body.filters);
        let lst = await Donhangexportxengoai.find(req.body.filters).limit(req.body.pageSize).skip(req.body.pageSize*n)
        .populate('nguonxe');
        let data = commonfun.dataReponse(alldata,lst,req.body.pageNum,req.body.pageSize);
        return res.status(200).send(new Response(0,"Data sucess", data));
    }
}

exports.PostDetail = async (req, res) => {
    let dhexport = await Donhangexportxengoai.findOne({_id: req.body.id});
    return res.status(200).send(new Response(0,"Data sucess", dhexport));
}

exports.PostUpdateStatus = async (req,res) => {
    await Donhangexportxengoai.updateOne({_id:req.body.id}, {$set:{status02: 1}});
    return res.status(200).send(new Response(0,"Data sucess", 1));
}

exports.postCreate = async (req,res) => {
    let status = _.toNumber(req.body.syskbn);
    let dh = new Donhangexportxengoai({
       nguonxe: req.body.nguonxe,
       ngayxuat: req.body.ngayxuat,
       ngaythanhtoan: null,
       title: req.body.title,
       lstdata: req.body.lstdata,
       lstheader: req.body.lstheader,
       header: req.body.header,
       status01: 1,
       status02: status,
       status03: 0,
       status04: 0,
       status05: 0,
       ghichu: "",
    });
    dh.save(async function(e){
        if(e) {
            return res.status(200).send(new Response(1001,"Data null", null));
        } else {
            // update id don hang đã chuyển sang chờ thanh toán
            let status01 = 1;
            if(status == 1) {
                status01 = 2;
            }
            for(let element of req.body.lstId) {
                await Congnoxengoai.updateOne({_id: element}, {$set: {status01: status01}});
            }
            // update list dơn hàng . status03 sang 1 để khóa đơn hang không cho cập nhật
            for(let element of req.body.lstdata) {
                await Chitietchuyenngoai.updateOne({_id: element[0]}, {$set : {status03 : 1}});
            }
            
            return res.status(200).send(new Response(0,"Data sucess", dh));
        }
    });
}

