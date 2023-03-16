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

exports.postCreate = async (req,res) => {
    let status = _.toNumber(req.body.syskbn);
    let dh = new Donhangexportxengoai({
       nguonxe: req.body.nguonxe,
       ngayxuat: req.body.ngay,
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
            return res.status(200).send(new Response(0,"Data sucess", dh));
        }
    });
}

