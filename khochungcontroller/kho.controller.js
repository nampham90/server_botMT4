const db = require("../khochungmodel");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Kho = db.kho;

exports.getLists = async (req, res) => {

}

exports.create = async (req, res) => {
    let kho = new Kho({
        tenkho: req.body.tenkho,
        diachikho: req.body.diachikho
    })
    kho.save(async function(e){
        if(e){
            return res.status(200).send(new Response(1001,"not save", null));
        } else {
            return res.status(200).send(new Response(0,"Data success", kho));
        }
    })
}