const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
const Account = db.account;

exports.findAll = (req,res) => {
    Account.find()
     .populate('Order_id')
     .then(data =>{
         res.status(200).send(new Response(0, "data Sucess !", data));
     })
     .catch(err =>{
        res.status(501).send(new Response(1010, err.message, null));
     })
}

