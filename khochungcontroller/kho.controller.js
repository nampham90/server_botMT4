const dbkhochung = require("../khochungmodel");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const { dbKhochung } = require("../common/DBConnect");
const Kho = dbkhochung.kho;

exports.getLists = async (req, res) => {

}

exports.create = async (req, res) => {
    console.log(req.body);
    let kho = new Kho({
        tenkho: req.body.tenkho,
        diachikho: req.body.diachikho,
        status01: 0,
        status02: 0,
        status03: 0,
        status04: 0,
        status05: 0
    })
    kho.save(async function(e){
        if(e){
            return res.status(200).send(new Response(1001,"not save", null));
        } else {
            return res.status(200).send(new Response(0,"Data success", kho));
        }
    })
}