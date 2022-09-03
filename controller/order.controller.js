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
        let listOrder =await Order.find({});//axios.get("http://localhost/orders/all");
        let listAccount = await  Account.find({}).populate('Order_id');//axios.get("http://localhost/account/all");
        
        let listLc = await Lenhcho.find({createdAt:{$gte:(nowdayt)}});//
        if(listLc.length > 0){
            for(const element of listLc) {
                if(element.status === false){
                    for(const elementOrderHistory of json.ordershistory){
                        if(elementOrderHistory.direction != 0 && elementOrderHistory.direction != 1){
                            if(element.ticket == elementOrderHistory.ticket) {
                                console.log(element.ticket + "Close Lenh chơ");
                                Lenhcho.updateOne({ticket:element.ticket},{$set: {status:true}})
                                .then(data => {
                                    console.log(data.modifiedCount + " update Lenh chơ status ticket " + element.ticket);
                                    if(data.modifiedCount == 1){
                                        let content = "\xF0\x9F\x8C\x95 Dong Lenh " +  element.direction + " " + element.pair   + "\n ENTRY: " + element.price + "\n SL: " + element.sl + "\n TP: " + element.tp;
                                        let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-635826973&text="+content;
                                        axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                    }
                                })
                                .catch(err=>{
                                    console.log(err.message);
                                });
                                break;
                            }
                        }
                    }
                }
            }
        }
        
        if(listOrder.length > 0){
            for(const element of listOrder){
                if(element.status === false) {
                    if(json.ordershistory){
                        for(const elementOrderHistory of json.ordershistory){
                            if(element.ticket == elementOrderHistory.ticket){
                                console.log(element.ticket + " Close");
                                Order.updateOne({ticket:element.ticket},{$set: {status:true}})
                                .then(data => {
                                    console.log(data.modifiedCount + " update Lenh chơ status ticket " + element.ticket);
                                    if(data.modifiedCount == 1){
                                        let content = "\xF0\x9F\x8C\x95 Dong Lenh @" + element.index +" " + element.direction + " " + element.pair   + "\n ENTRY: " + element.price + "\n SL: " + element.sl + "\n TP: " + element.tp + "\nPROFIT: " +element.orderProfit +"$";
                                        let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-635826973&text="+content;
                                        axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                    }
                                })
                                .catch(err=>{
                                    console.log(err.message);
                                });
                                break;
                            }     
                        }
                    }
                }
            }
        }
        if(listAccount.length > 0){
            for(const element of listAccount) {
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
                let listOrderRunDB = await Order.find({status: false,createdAt:{$gte:(nowdayt)}});
               // console.log(listOrderRunDB);
                if(o.direction == 0 || o.direction == 1) {
                    listOrderRunDB.forEach(async function(orderDB){
                        if(o.ticket == orderDB.ticket){
                            if(o.tp != orderDB.tp && o.sl != orderDB.sl){
                                //update tp
                                Order.updateOne({ticket: orderDB.ticket},{$set:{tp:o.tp, sl:o.sl}})
                                .then(data=>{
                                    console.log(data.modifiedCount + " Update TP-SL " + orderDB.ticket);
                                    let content = "\xE2\x9A\x99 Update TP-SL @" + orderDB.index +" " + orderDB.direction + " " + orderDB.pair   + "\n ENTRY: " + orderDB.price + "\n SL New: " + o.sl + "\n TP New: " + o.tp;
                                    let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-635826973&text="+content;
                                    axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                })
                                .catch(err=>{
                                    console.log(err.message);
                                })
                            }else {
                                if(o.tp != orderDB.tp){
                                    //update tp
                                    Order.updateOne({ticket: orderDB.ticket},{$set:{tp:o.tp}})
                                    .then(data=>{
                                        console.log(data.modifiedCount + " Update Tp " + orderDB.ticket);
                                        let content = "\xE2\x9A\x99 Update TP @" + orderDB.index +" " + orderDB.direction + " " + orderDB.pair   + "\n ENTRY: " + orderDB.price + "\n SL: " + orderDB.sl + "\n TP New: " + o.tp;
                                        let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-635826973&text="+content;
                                        axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                    })
                                    .catch(err=>{
                                        console.log(err.message);
                                    })
                                }
                                if(o.sl != orderDB.sl){
                                    //update tp
                                    Order.updateOne({ticket: orderDB.ticket},{$set:{sl:o.sl}})
                                    .then(data=>{
                                        console.log(data.modifiedCount + " Update SL " + orderDB.ticket);
                                        let content = "\xE2\x9A\x99 Update SL @" + orderDB.index +" " + orderDB.direction + " " + orderDB.pair   + "\n ENTRY: " + orderDB.price + "\n SL New: " + o.sl + "\n TP: " + orderDB.tp;
                                        let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-635826973&text="+content;
                                        axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                    })
                                    .catch(err=>{
                                        console.log(err.message);
                                    })
                                }
                            }
                            
                        }
                    })
                }else {
                    let listOrderHistoryRunDB = await Lenhcho.find({status: false,createdAt:{$gte:(nowdayt)}});
                    
                    listOrderHistoryRunDB.forEach(async function(ordershistory){
                        if(o.ticket == ordershistory.ticket){
                            if(o.tp != ordershistory.tp && o.sl != ordershistory.sl) {
                                Lenhcho.updateOne({ticket: o.ticket},{$set:{tp:o.tp, sl:o.sl}})
                                .then(data=>{
                                    console.log(data.modifiedCount + " Update Tp " + ordershistory.ticket);
                                    let content = "\xE2\x9A\x99 Update SL-TP"  +" " + ordershistory.direction + " " + ordershistory.pair   + "\n ENTRY: " + ordershistory.price + "\n SL New: " + o.sl + "\n TP New: " + o.tp;
                                    let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-635826973&text="+content;
                                    axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                })
                                .catch(err=>{
                                    console.log(err.message);
                                })
                            }else {
                                if(o.tp != ordershistory.tp){
                                    //update tp
                                    Lenhcho.updateOne({ticket: o.ticket},{$set:{tp:o.tp}})
                                    .then(data=>{
                                        console.log(data.modifiedCount + " Update Tp " + ordershistory.ticket);
                                        let content = "\xE2\x9A\x99 Update TP"  +" " + ordershistory.direction + " " + ordershistory.pair   + "\n ENTRY: " + ordershistory.price + "\n SL: " + ordershistory.sl + "\n TP New: " + o.tp;
                                        let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-635826973&text="+content;
                                        axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                    })
                                    .catch(err=>{
                                        console.log(err.message);
                                    })
                                }
                                if(o.sl != ordershistory.sl){
                                    //update tp
                                    Lenhcho.updateOne({ticket: o.ticket},{$set:{sl:o.sl}})
                                    .then(data=>{
                                        console.log(data.modifiedCount + " Update SL " + ordershistory.ticket);
                                        let content = "\xE2\x9A\x99 Update SL" + " " + ordershistory.direction + " " + ordershistory.pair   + "\n ENTRY: " + ordershistory.price + "\n SL New: " + o.sl + "\n TP: " + ordershistory.tp;
                                        let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-635826973&text="+content;
                                        axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                    })
                                    .catch(err=>{
                                        console.log(err.message);
                                    })
                                }
                            }
                            
                        }
                    });

                }
                let listAccountNew = await  Account.find({});//axios.get("http://localhost/account/all");
                let check = false;
                if(listOrder.length > 0) {
                    for(const element of listOrder){
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
                    let orderType = "";

                    switch(o.direction) {
                        case "0" : orderType = "BUY"; break;
                        case "1" : orderType = "SELL"; break;
                        case "2" : orderType = "BUY_LIMIT"; break;
                        case "3" : orderType = "SELL_LIMIT"; break;
                        case "4" : orderType = "BUY_STOP"; break;
                        case "5" : orderType = "SELL_STOP";
                    }
                    const newOrder = new Order({
                        index : "",
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
                    if(o.direction == 0 || o.direction == 1) {
                        let listOrderday = await Order.find({createdAt:{$gte:(nowdayt)}});//axios.get("http://localhost/orders/orderday");
                        let total = listOrderday.length;
                        total = total + 1;
                        newOrder.index = total;
                        newOrder.save(async function(e){
                            if(e) {}
                            else {
                               // console.log(listAccountNew.data);
                                if (listAccountNew.length == 0) {
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
                                    for(const element of listAccountNew){
                                         if(json.accNumber == element.accNumber) {
                                            Account.updateOne({accNumber:element.accNumber},{$push:{Order_id:newOrder.id}})
                                               .then(data =>{
                                                   console.log(data.modifiedCount + " Add order " + newOrder.id);
                                               })
                                               .catch(err=>{
                                                   console.log(err.message);
                                               })                                                                                  
                                            checkAccount = true;
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
                                if(newOrder.direction == "BUY") {
                                    let content ="\xF0\x9F\x94\xB5 " + "@"+ total + " " + newOrder.direction + " NOW " + newOrder.pair   + "\nENTRY: " + newOrder.price + "\nVolume: " + newOrder.lot + "\nSL: " + newOrder.sl + "\nTP: " + newOrder.tp;
                                    let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-635826973&text="+content;
                                    axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                } else {
                                    let content ="\xF0\x9F\x94\xB4 " + "@"+ total + " " + newOrder.direction + " NOW " + newOrder.pair   + "\nENTRY: " + newOrder.price + "\nVolume: " + newOrder.lot + "\nSL: " + newOrder.sl + "\nTP: " + newOrder.tp;
                                    let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-635826973&text="+content;
                                    axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                }
                               
                            }            
                        });
                    } else {
                        const newLenhcho = new Lenhcho({
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
                        let listLenhcho = await  Lenhcho.find({});//axios.get("http://localhost/lenhcho/all");
                        let cheklenhcho = false;
                        for(const element of listLenhcho){
                            if(newLenhcho.ticket == element.ticket){
                                cheklenhcho = true;
                            }
                        }
                        if(cheklenhcho === false) {
                            newLenhcho.save(async function(e){
                                if(e) {}
                                else {
                                    if(newLenhcho.direction == "BUY_LIMIT" || newLenhcho.direction == "BUY_STOP"){
                                        let content = "\xF0\x9F\x94\xB5 " + newLenhcho.direction + " " + newLenhcho.pair   + "\n ENTRY: " + newLenhcho.price + "\nVolume: " + newLenhcho.lot + "\n SL: " + newLenhcho.sl + "\n TP: " + newLenhcho.tp;
                                        let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-635826973&text="+content;
                                        axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                    }else {
                                        let content = "\xF0\x9F\x94\xB4 " + newLenhcho.direction + " " + newLenhcho.pair   + "\n ENTRY: " + newLenhcho.price + "\nVolume: " + newLenhcho.lot + "\n SL: " + newLenhcho.sl + "\n TP: " + newLenhcho.tp;
                                        let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-635826973&text="+content;
                                        axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                    }
                                }
                            });
                        }                        
                    }
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

exports.findOrderDay = (req,res) => {
    let date = new Date()
    let nowday = "";
    let day = date.getDate();
    let thang = parseInt(date.getMonth());
    thang = thang + 1;
    let year = date.getFullYear();
    nowday = nowday + "" + year + "-" + thang + "-" + day;
    console.log(nowday);
    Order.find({createdAt:{$gte:(nowday)}})
    .then(data => {
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
             message :
             err.message || "ome error occurred while retrieving tutorials."
        });
    })
    
}

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
}