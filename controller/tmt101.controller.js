const db = require("../model");
const Const = require('../common/const');
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const _ = require('lodash');

const TMT101 = db.tmt101;

exports.Create = async (req,res) => {
    let checkUrldisplayid = await TMT101.findOne({urldisplayid:req.body.urldisplayid});
    if(checkUrldisplayid) {
        return res.status(200).send(new Response(1001,'urldisplayid tồn tại !',req.body.urldisplayid));
    } else {
        let tmt = new TMT101({
            idyoutube: req.body.idyoutube,
            urldisplayid: req.body.urldisplayid,// id màn hình hiển thị hướng dân: vd: spkh00101
            title: req.body.title, //tiêu đề video
            content: req.body.content, // nôi dung video
            status01: 0, 
            status02: 0, 
            status03: 0, 
            status04: 0,
            status05: 0
        });
        await tmt.save();
        return res.status(200).send(new Response(0,'Tạo thành công !',tmt));
    }
}

exports.Detail = async (req, res) => {
    let tmt = await TMT101.findOne({urldisplayid: req.body.urldisplayid});
    if(tmt) {
        return res.status(200).send(new Response(0,'data susecss !',tmt['idyoutube']));
    }
    return res.status(200).send(new Response(1001,'Video hướng dẫn không tồn tại !',null));
}

exports.GetDetail = async (req, res) => {
    let tmt = await TMT101.findOne({_id: req.body.id});
    if(tmt) {
        return res.status(200).send(new Response(0,'data susecss !',tmt));
    }
    return res.status(200).send(new Response(1001,'Lỗi hệ thống. ID không tồn tại  !',null));
}

exports.Update = async (req, res) => {
    console.log(req.body);
    let tmt = await TMT101.updateOne({_id: req.body.id},{$set: {idyoutube: req.body.idyoutube,urldisplayid:req.body.urldisplayid}});
    if(tmt) {
        return res.status(200).send(new Response(0,'data susecss !',1));
    }
    return res.status(200).send(new Response(1001,'Lỗi hệ thống. ID không tồn tại !',null));
}

exports.getLists = async (req,res) => {
    let allData = await TMT101.find(req.body.filters);
    if(req.body.pageNum == 0 && req.body.pageSize ==0) {
        res.status(200).send(new Response(0,"data sucess",allData));
    } else {
        let n = req.body.pageNum - 1;
        let lst = await TMT101.find(req.body.filters).limit(req.body.pageSize).skip(req.body.pageSize*n);
        let data = commonfun.dataReponse(allData,lst,req.body.pageNum,req.body.pageSize);
        res.status(200).send(new Response(0,"data sucess",data));
    }
}

exports.searchParams = async (req,res) => {
    let allData = await TMT101.find({ $text:{ $search: req.body.filters}});
    if(req.body.pageNum == 0 && req.body.pageSize ==0) {
        res.status(200).send(new Response(0,"data sucess",allData));
    } else {
        let n = req.body.pageNum - 1;
        let lst = await TMT101.find({$text:{ $search: req.body.filters}}).limit(req.body.pageSize).skip(req.body.pageSize*n);
        let data = commonfun.dataReponse(allData,lst,req.body.pageNum,req.body.pageSize);
        res.status(200).send(new Response(0,"data sucess",data));
    }
}