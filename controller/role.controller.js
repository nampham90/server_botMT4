const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
const Role = db.role;


exports.getListRole = async(req,res) => {
    let lst = await Role.find({});
    if(lst.length > 0) {
       return res.status(200).send(new Response(0,"Data sucess", lst));
    }
    return res.status(400).send(new Response(1000,"is not data Role", null));
}
