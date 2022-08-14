const db = require("../model");

const Account = db.account;

exports.findAll = (req,res) => {
    Account.find()
     .populate('Order_id')
     .then(data =>{
         res.send(data);
     })
     .catch(err =>{
        res.status(500).send({
            message :
            err.message || "ome error occurred while retrieving tutorials."
       });
     })
}

