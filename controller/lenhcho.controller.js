const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response

const Lenhcho = db.lenhcho;

exports.findAll = (req,res) => {
    Lenhcho.find()
    .then(data =>{
        res.status(200).send(new Response(0,"data sucess  !",data));
    })
    .catch(err =>{
       res.status(500).send(new Response(1010,err.message,null));
    })
}