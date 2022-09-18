const db = require("../model");

const Account = db.account;

exports.findAll = (req,res) => {
    // let token = JSON.stringify(req.headers.authorization);
    // // token = token.replace('Bearer ');
    // console.log(token);
    Account.find()
     .populate('Order_id')
     .then(data =>{
         res.send(data);
     })
     .catch(err =>{
        res.status(501).send({
            message :
            err.message || "ome error occurred while retrieving tutorials."
       });
     })
}

