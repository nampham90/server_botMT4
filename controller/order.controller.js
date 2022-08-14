const db = require("../model");
const axios = require("axios");
const e = require("express");
const Order = db.orders;
const Account = db.account;

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
        
        let listOrder =await axios.get("http://117.2.200.164/orders/all");
        let listAccount = await axios.get("http://117.2.200.164/account/all");
        if(listOrder.data.length > 0){
            for(const element of listOrder.data){
                if(element.status === false) {
                    let checkOrder = false;
                    if(json.orders){
                        for(const elementOrder of json.orders) {
                            if(element.ticket == elementOrder.ticket) {
                                checkOrder = true;
                                break;
                            }
                         }
                    }else if(json.ordershistory){
                        let count = 0;
                        for(const elementOrderHistory of json.ordershistory){
                            if(element.ticket == elementOrderHistory.ticket){
                                console.log(element.ticket + "Close");
                                count = count + 1;
                                break;
                            }     
                        }
                        if(count === 0){
                            checkOrder = true;
                        }
                    }
                    if(checkOrder === false){
                        Order.updateOne({ticket:element.ticket},{$set: {status:true}})
                        .then(data => {
                            console.log(data.modifiedCount + " update status " + element.ticket);
                            if(data.modifiedCount == 1){
                                let content = "Close Order " + element.ticket + " " + element.pair + " " + element.direction + " Price " + element.price + " SL " + element.sl + " TP " + element.tp + " Close on orderProfit " +element.orderProfit +"$";
                                let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-635826973&text="+content;
                                axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                            }
                        })
                        .catch(err=>{
                            console.log(err.message);
                        });
                    }
                }
            }
        }
        if(listAccount.data.length > 0){
            for(const element of listAccount.data) {
                if(json.accNumber == element.accNumber && json.accBalance != element.accBalance) {
                    Account.updateOne({accNumber:json.accNumber},{$set:{accBalance:json.accBalance,accEquity:json.accEquity}})
                    .then(data=>{
                        console.log(data.modifiedCount + " Update acc " + json.accNumber);
                    })
                    .catch(err=>{
                        console.log(err.message);
                    })
                }
            }
        }
        if(json.orders){
            json.orders.forEach(async function(o){
                let listAccountNew = await  axios.get("http://117.2.200.164/account/all");
                let check = false;
                if(listOrder.data.length > 0) {
                    for(const element of listOrder.data){
                        if(o.ticket == element.ticket) {
                           check = true;
                           if(o.orderProfit != element.orderProfit){
                                Order.updateOne({ticket:o.ticket},{$set:{orderProfit:o.orderProfit}})
                                .then(data=>{
                                    console.log(data.modifiedCount + " Update profit ticket " + o.ticket + " new profit " + o.orderProfit + "$");
                                })
                                .catch(err => {
                                    console.log(err.message);
                                })
                           }
                        }
                     }
                }

                if(o.sl != "0" && o.tp != "0" && check === false){
                    let orderType = "SELL";
                    if(o.direction != 1) {
                        orderType = "BUY";
                    } 
                    const newOrder = new Order({
                        ticket: o.ticket,
                        pair: o.pair,
                        direction: orderType,
                        lot: o.lot,
                        price: o.price,
                        sl: o.sl,
                        tp: o.tp,
                        opentime: o.opentime,
                        comment: o.comment,
                        orderProfit: o.orderProfit,
                        status:false
                    })
                    console.log(newOrder.pair);
                    newOrder.save(async function(e){
                        if(e) {}
                        else {
                            console.log(listAccountNew.data);
                            if (listAccountNew.data.length == 0) {
                                let listIdOrder = [];
                                listIdOrder = listIdOrder.concat(newOrder.id)
                                const newAccount = new Account ({
                                    server: json.server,
                                    total: json.total,
                                    accKhoitao: json.accBalance,
                                    accBalance: json.accBalance,
                                    accEquity:json.accEquity,
                                    accNumber:json.accNumber,
                                    donbay:json.donbay,
                                    accServer: json.accServer,
                                    Order_id: listIdOrder
                                });
                                await newAccount.save();
                                
                            }else {
                                let checkAccount = false;
                                for(const element of listAccountNew.data){
                                     if(json.accNumber == element.accNumber) {
                                        Account.updateOne({accNumber:element.accNumber},{$push:{Order_id:newOrder.id}})
                                           .then(data =>{
                                               console.log(data.modifiedCount + " Add order " + newOrder.id);
                                           })
                                           .catch(err=>{
                                               console.log(err.message);
                                           })                                                                                  
                                        checkAccount = true;
                                        console.log(checkAccount);
                                         break;
                                     }
                                }
                                if(checkAccount === false) {
                                    let listIdOrder = [];
                                    listIdOrder = listIdOrder.concat(newOrder.id)
                                    const newAccount = new Account({
                                        server: json.server,
                                        total: json.total,
                                        accKhoitao: json.accBalance,
                                        accBalance: json.accBalance,
                                        accEquity:json.accEquity,
                                        accNumber:json.accNumber,
                                        donbay:json.donbay,
                                        accServer: json.accServer,
                                        Order_id: listIdOrder
                                    });
                                    newAccount.save();
                                }
                            }
                            
                            //5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M
                            //BotNamPhamTelegram
                            //username
                            //BotNamPhamTelegram_bot
                            //https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/getUpdates
                            //https://api.telegram.org/botbot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-635826973&text={notification_text}
            
                            //-635826973
                            let content = "Order " + newOrder.ticket + " " + newOrder.pair + " " + newOrder.direction + " Price " + newOrder.price + " SL " + newOrder.sl + " TP " + newOrder.tp;
                            let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-635826973&text="+content;
                            axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                        }            
                    });
                   
                }
            });
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