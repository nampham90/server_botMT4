const db = require("../model");
const axios = require("axios");
const e = require("express");
const common = require("../common/functionCommon");
const Order = db.orders;
const Account = db.account;
const Lenhcho = db.lenhcho;

exports.create =  async(req,res)=>{
    if(!req.body){
        res.status(400).send({message : "Content can not be empty !"});
        return;
    }else{
        let stringFromServer = JSON.stringify(req.body);
        stringFromServer = stringFromServer.substring(2);
        stringFromServer = stringFromServer.replace('}\\u0000":""','');
        stringFromServer = stringFromServer.replace(/\\/g,'');
        stringFromServer = stringFromServer.replace('u0000":""','');

        let json = JSON.parse(stringFromServer);
        let nowdayt = common.dateNow(); 
        let listOrder =await Order.find({});
        let listAccount = await  Account.find({}).populate('Order_id');
        
        let listLc = await Lenhcho.find({createdAt:{$gte:(nowdayt)}});

        switch(json.accNumber){
            case "70060301" : common.controlMessageTelegram(json,nowdayt,listOrder,listAccount,listLc,"1001589294497",Order,Account,Lenhcho,axios,"70060301");break;
            case "70060302" : common.controlMessageTelegram(json,nowdayt,listOrder,listAccount,listLc,"1001686087745",Order,Account,Lenhcho,axios,"70060302");break;
            case "70060303" : common.controlMessageTelegram(json,nowdayt,listOrder,listAccount,listLc,"1001511689931",Order,Account,Lenhcho,axios,"70060303");break;
            default:  common.controlMessageTelegram(json,nowdayt,listOrder,listAccount,listLc,"635826973",Order,Account,Lenhcho,axios,"8496774");
        }
        res.end();
    }
}

exports.findAll = (req, res) => {
    Order.find()
      .then(data=>{
           res.send(data);
       
      })
      .catch(err=>{
          res.status(500).send({
               message :
               err.message || "ome error occurred while retrieving tutorials."
          });
      })
};

exports.removeAll = (req,res) => {
    Order.remove({})
    .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete not found!`
            });
        } else {
            res.send({
            message: "deleted successfully!"
            });
        }
      })
      .catch(err => {
        res.status(500).send({
            message: "Could not delete " + err.message
        });
      });
   // Order.find()
}
// list order đang chạy theo accNumber
exports.findOrderRunAcc = (req,res) =>{
    let accNum = req.body.accNumber;
    console.log(accNum);
    Order.find({accNumber: accNum, status: false})
    .then(data=>{
        res.send(data);
   })
   .catch(err=>{
       res.status(500).send({
            message :
            err.message || "ome error occurred while retrieving tutorials."
       });
   })
}
// list order đã đóng trong ngày hiện tại
exports.findOffinDay = (req,res) => {
    let accNum = req.body.accNumber;
    let day = req.body.day;
    let nowday = common.dateNow();
    console.log(req.body);
    Order.find({accNumber: accNum, status: true,createdAt:{$gte:(nowday)}})
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
       res.status(500).send({
            message :
            err.message || "ome error occurred while retrieving tutorials."
       });
    })
}