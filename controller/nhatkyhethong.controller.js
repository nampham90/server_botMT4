const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Nhatkyhethong = db.nhatkyhethong;

exports.getLists = async (req,res) => {
    console.log(req.body);
}