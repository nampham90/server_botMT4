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
    if(req.body.pageSize == 0 && req.body.pageNum == 0) {
        let alldata = await Chitietchuyenngoai.find({})
        .populate('nguonxe');
        return res.status(200).send(new Response(0,"Data sucess", alldata));
    } else {
        let n = req.body.pageNum - 1;
        let alldata = await Chitietchuyenngoai.find(req.body.filters);
        let lst = await Chitietchuyenngoai.find(req.body.filters).limit(req.body.pageSize).skip(req.body.pageSize*n)
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