const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Nhatkyhethong = db.nhatkyhethong;

exports.getListsType = async (req,res) => {
    let search = {};
    search.loaithongbao = req.body.loaithongbao;
    let lstnotifi = await Nhatkyhethong.find(search).limit(5).sort({"ngay": -1})
    .populate('iduser',{ password: 0 });
    return res.status(200).send(new Response(0,"data success !", lstnotifi));
}