const db = require("../model");

const Lenhcho = db.lenhcho;

exports.findAll = (req,res) => {
    Lenhcho.find()
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