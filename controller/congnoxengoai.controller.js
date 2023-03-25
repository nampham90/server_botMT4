const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const _ = require('lodash');
const Chuyenngoai = db.chuyenngoai;
const Chitietchuyenngoai = db.chitietchuyenngoai;
const Congnoxengoai = db.congnoxengoai;
const Nhatkykh = db.nhatkykh;

// list all 
exports.PostAll = async (req,res) => {
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
    sreach.ngaynhap = {$gte:gt,$lt:lt};
    if(filters.status01) {
        sreach.status01 = filters.status01;
    }
    if(filters.nguonxe) {
        sreach.nguonxe = filters.nguonxe;
    }
    if(req.body.pageSize == 0 && req.body.pageNum == 0) {
        let alldata = await Congnoxengoai.find({})
        .populate('nguonxe')
        .populate('iddonhang');
        return res.status(200).send(new Response(0,"Data sucess", alldata));
    } else {
        let n = req.body.pageNum - 1;
        let alldata = await Congnoxengoai.find(sreach);
        let lst = await Congnoxengoai.find(sreach).limit(req.body.pageSize).skip(req.body.pageSize*n)
        .populate('iddonhang')
        .populate('nguonxe');
        let data = commonfun.dataReponse(alldata,lst,req.body.pageNum,req.body.pageSize);
        return res.status(200).send(new Response(0,"Data sucess", data));
    }
}