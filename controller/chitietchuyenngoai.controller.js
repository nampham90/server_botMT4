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
    sreach.createdAt = {$gte:gt,$lt:lt};
    if(filters.idkhachhang) {
        sreach.idkhachhang = filters.idkhachhang;
    }
    if(filters.nguonxe) {
        sreach.nguonxe =  filters.nguonxe;
    }
    if(filters.soods) {
        sreach.soods = filters.soods;
    }
    if(filters.status02) {
        sreach.status02 = filters.status02;
    }
    
    if(req.body.pageSize == 0 && req.body.pageNum == 0) {
        let alldata = await Chitietchuyenngoai.find({})
        .populate('nguonxe');
        return res.status(200).send(new Response(0,"Data sucess", alldata));
    } else {
        let n = req.body.pageNum - 1;
        let alldata = await Chitietchuyenngoai.find(sreach);
        let lst = await Chitietchuyenngoai.find(sreach).limit(req.body.pageSize).skip(req.body.pageSize*n)
        .populate('idkhachhang')
        .populate('nguonxe');
        let data = commonfun.dataReponse(alldata,lst,req.body.pageNum,req.body.pageSize);
        return res.status(200).send(new Response(0,"Data sucess", data));
    }
}

// Update list ID
exports.PostUpdateListId = async (req,res) => {
    for(let element of req.body.ids) {
        await Chitietchuyenngoai.updateOne({_id:element},{$set: {status02: "2"}});
    }
    return res.status(200).send(new Response(0,"Data sucess", 1));
}

exports.GetID = async (req,res) => {
    let id = req.body.id;
    let ct = await Chitietchuyenngoai.findOne({_id:id});
    return res.status(200).send(new Response(0,"Data sucess", ct));
}