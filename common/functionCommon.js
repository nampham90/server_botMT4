
const db = require('../model');
const _ = require('lodash');
let Responses = require('../common/response');
const User = db.user;

let DataResponse = Responses.DataResponse;


exports.dataReponse = (allData,data,pageNum,pageSize) =>{
    if(pageNum == 0 && pageSize == 0 || data.length == 0) {
        let datares =new DataResponse(allData,allData,pageNum,pageSize,
            data.length,1,data.length,0,0,0,false,true,false,false,0,[],0,0);
        return datares;
    }else{
        let total = allData.length;
        let pages =getPages(total,pageSize);
        let endRow = getEndrow(total,pageNum,pageSize,pages);
        let hasNextPage = gethasNextPage(total,pageNum,pageSize,pages);
        let hasPreviousPage = gethasPreviousPage(pages);
        let isFirstPage = getisFirstPage(pageNum,pages);
        let isLastPage = getisLastPage(pages);
        let navigateFirstPage = 1;
        let navigateLastPage = pages;
        let navigatePages = 8;
        let navigatepageNums = getnavigatePages(pages);
        let nextPage = getnextPage(pageNum,pages);

        let prePage = pageNum -1;
        let size = getSize(total,pageNum,pageSize,pages);
        let startRow = getstartRow(pageNum,pageSize);

        let datares = new DataResponse(allData,data,pageNum,pageSize,size,startRow,endRow,pages,prePage,nextPage,isFirstPage,
            isLastPage,hasPreviousPage,hasNextPage,navigatePages,navigatepageNums,navigateFirstPage,navigateLastPage);
        return datares;
    }
}

function getstartRow(pageNum,pageSize){
    let startRow;
    if(pageNum == 1) {
        startRow = 1;
    }else {
        startRow = (pageNum * pageSize) - (pageSize-1);
    }
    return startRow;
}

function getSize(total,pageNum,pageSize,pages) {
     let size;
     if(total < pageSize) {
         size = total;
     }else if(pages == pageNum && pages > 1) {
        size = total % pageSize;
     } else {
         size = pageSize;
     }
     return size;
}
function getnextPage(pageNum,pages) {
    let nextPage;
    if(pageNum == pages){
        nextPage = 0;
    }else {
        nextPage = pageNum + 1;
    }
    return nextPage;
}

function getnavigatePages(pages){
    let navigatePages = [];
    for(let i=0;i<pages;i++) {
        navigatePages.push(i+1);
    }
    return navigatePages;
}

function getisLastPage(pages){
    let isLastPage;
    if(pages == 1) {
        isLastPage = false;
    }else {
        isLastPage = true;
    }
    return isLastPage;
}
function getPages(total, pageSize){
   let pages = 0;
   let phan_nguyen = _.floor((total/pageSize));
   if(total % pageSize == 0){
       pages = phan_nguyen;
   }else {
       pages = phan_nguyen + 1;
   }
   return pages;
}

function getEndrow(total,pageNum,pageSize,pages){
    let endRow =0;
    if(pages == 1) {
        endRow = total;
    } else if(pages == pageNum) {
        endRow = total % pageSize;
    }else {
        endRow =pageSize;
    }
    return endRow;
}

function gethasNextPage(total,pageNum,pageSize,pages){
   let hasNextPage;
   if(pages == 1 && total < pageSize) {
       hasNextPage = false;
   } else if(pages == pageNum) {
       hasNextPage = false;
   } else {
       hasNextPage = true;
   }
   return hasNextPage;
}

function gethasPreviousPage(pages){
    let hasPreviousPage;
    if(pages == 1) {
        hasPreviousPage = false;
    } else {
        hasPreviousPage = true;
    }
    return hasPreviousPage;
}

function getisFirstPage(pageNum,pages){
    let isFirstPage;
    if(pages == pageNum) {
        isFirstPage = false;
    }else {
        isFirstPage = true;
    }

    return isFirstPage;
}

// funcon kiem tra và xóa menu ra khỏi danh sách
exports.checkAndremoveIdMenu = async (idUser,idmenu) => {
   let listmenu = [];
   let u = await User.findOne({_id: idUser});
   if(!u) return listmenu;
   listmenu = u.menulist;
   let check = false;
   if(listmenu.length > 0) {
    listmenu.forEach(element => {
        if(element._id == idmenu){
          check = true;
        }
    })
   }
   if(check === true) {
      let newlst = _.remove(listmenu, function(m) {
        return m._id != idmenu;
      });
      return newlst;
   }
   return listmenu;
}
// function kiem tra id menu có trong danh sach hay khong
exports.checkIdMenu = async (idUser,idmenu) => {
    let u = await User.findOne({_id: idUser});
    if(!u) return false;
    let listmenu = u.listmenu;
    let check = false;
    listmenu.forEach(element => {
       if(element._id == idmenu){
         check = true;
       }
    })
    if(check === true) {
       return true;
    }
    return false;
 }



exports.dateNow = () => {
    let date = new Date()
    let nowday = "";
    let day = date.getDate();
    let thang = parseInt(date.getMonth());
    thang = thang + 1;
    let year = date.getFullYear();
    nowday = nowday + "" + year + "-" + thang + "-" + day;
    return nowday;
}
exports.take_decimal_number = (num,n) => {
    let base = 10**n;
    let result = Math.round(num * base) / base ;
    return result;
}

exports.getDateparam = (param) => {
    
    let date = new Date(param);
    let nowday = "";
    let day = date.getDate();
    let thang = parseInt(date.getMonth());
    thang = thang + 1;
    let year = date.getFullYear();
    nowday = nowday + "" + year + "-" + thang + "-" + day;
    return nowday;
}
exports.controlMessageTelegram = (json,nowdayt,listOrder,listAccount,listLc,chatId,Order,Account,Lenhcho,axios,acc) => {
    const url ="https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-";
   const urltext = "&text=";

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
                                    let content = "\xF0\x9F\x8C\x95 Dong Lenh " +  element.direction + " " + element.pair   + "\n ENTRY: " + element.price + "" + "\n SL: " + element.sl + "\n TP: " + element.tp;
                                    let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-"+chatId+"&text="+content;
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
                                    let content = "\xF0\x9F\x8C\x95 Dong Lenh @" + element.index +" " + element.direction + " " + element.pair   + "\n ENTRY: " + element.price + "" + "\n SL: " + element.sl + "\n TP: " + element.tp + "\nPROFIT: " +elementOrderHistory.orderProfit +"$";
                                    let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-"+chatId+"&text="+content;
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
                                let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-"+chatId+"&text="+content;
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
                                    let content = "\xE2\x9A\x99 Update TP @" + orderDB.index +" " + orderDB.direction + " " + orderDB.pair   + "\n ENTRY: " + orderDB.price + "" + "\n SL: " + orderDB.sl + "\n TP New: " + o.tp;
                                    let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-"+chatId+"&text="+content;
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
                                    let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-"+chatId+"&text="+content;
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
                                let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-"+chatId+"&text="+content;
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
                                    let content = "\xE2\x9A\x99 Update TP"  +" " + ordershistory.direction + " " + ordershistory.pair   + "\n ENTRY: " + ordershistory.price + "" + "\n SL: " + ordershistory.sl + "\n TP New: " + o.tp;
                                    let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-"+chatId+"&text="+content;
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
                                    let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-"+chatId+"&text="+content;
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
            let listAccountNew = await  Account.find({});
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
                    status:false,
                    accNumber: json.accNumber
                })
                if(o.direction == 0 || o.direction == 1) {
                    let listOrderday = await Order.find({accNumber:acc,createdAt:{$gte:(nowdayt)}});
                    let total = listOrderday.length;
                    total = total + 1;
                    newOrder.index = total;
                    newOrder.save(async function(e){
                        if(e) {}
                        else {
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
                            //https://api.telegram.org/botbot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-"+chatId+"&text={notification_text}
            
                            //-"+chatId+"
                            //-1001589294497
                            let listCheckLenhcho = await Lenhcho.find({createdAt:{$gte:(nowdayt)}});
                            if(listCheckLenhcho.length>0){
                                let checkLenhcho = false;
                                listCheckLenhcho.forEach(async function(orderLenhcho){
                                    if(newOrder.ticket == orderLenhcho.ticket){
                                        checkLenhcho = true;
                                    }
                                });

                                if(checkLenhcho === true) {
                                    let getTicketLenhCho = await Lenhcho.findOne({ticket: newOrder.ticket});
                                    Lenhcho.updateOne({ticket: newOrder.ticket},{$set: {status: true}})
                                    .then(data => {
                                        console.log(data.modifiedCount + " Khop lenh");
                                    })
                                    .catch(err => {
                                        console.log("err update khop lenh !");
                                    })

                                    if(newOrder.direction == "BUY") {
                                        let content ="\xF0\x9F\x94\xB5 " + "@"+ total + " KHOP LENH " + getTicketLenhCho.direction + " " + newOrder.pair   + "\nENTRY: " + newOrder.price + "\nVolume: " + newOrder.lot + " lot" + "\nSL: " + newOrder.sl + "\nTP: " + newOrder.tp;
                                        let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-"+chatId+"&text="+content;
                                        axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                        
                                    } else {
                                       let content ="\xF0\x9F\x94\xB4 " + "@"+ total + " KHOP LENH " + getTicketLenhCho.direction + " " + newOrder.pair   + "\nENTRY: " + newOrder.price + "\nVolume: " + newOrder.lot + " lot" + "\nSL: " + newOrder.sl + "\nTP: " + newOrder.tp;
                                       let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-"+chatId+"&text="+content;
                                       axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                       
                                    }
                                }else {
                                    if(newOrder.direction == "BUY") {
                                       let content ="\xF0\x9F\x94\xB5 " + "@"+ total + " " + newOrder.direction + " NOW " + newOrder.pair   + "\nENTRY: " + newOrder.price + "\nVolume: " + newOrder.lot + " lot" + "\nSL: " + newOrder.sl + "\nTP: " + newOrder.tp;
                                       let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-"+chatId+"&text="+content;
                                       axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                        
                                    } else {
                                        let content ="\xF0\x9F\x94\xB4 " + "@"+ total + " " + newOrder.direction + " NOW " + newOrder.pair   + "\nENTRY: " + newOrder.price + "\nVolume: " + newOrder.lot + " lot" + "\nSL: " + newOrder.sl + "\nTP: " + newOrder.tp;
                                        let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-"+chatId+"&text="+content;
                                        axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                        
                                    }
                                }
                            }else {
                                if(newOrder.direction == "BUY") {
                                    let content ="\xF0\x9F\x94\xB5 " + "@"+ total + " " + newOrder.direction + " NOW " + newOrder.pair   + "\nENTRY: " + newOrder.price + "\nVolume: " + newOrder.lot + " lot" + "\nSL: " + newOrder.sl + "\nTP: " + newOrder.tp;
                                    let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-"+chatId+"&text="+content;
                                    axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                    
                                } else {
                                    let content ="\xF0\x9F\x94\xB4 " + "@"+ total + " " + newOrder.direction + " NOW " + newOrder.pair   + "\nENTRY: " + newOrder.price + "\nVolume: " + newOrder.lot + " lot" + "\nSL: " + newOrder.sl + "\nTP: " + newOrder.tp;
                                    let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-"+chatId+"&text="+content;
                                    axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                    
                                }
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
                    let listLenhcho = await  Lenhcho.find({});
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
                                    let content = "\xF0\x9F\x94\xB5 " + newLenhcho.direction + " " + newLenhcho.pair   + "\n ENTRY: " + newLenhcho.price + "\nVolume: " + newLenhcho.lot + " lot" + "\n SL: " + newLenhcho.sl + "\n TP: " + newLenhcho.tp;
                                    let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-"+chatId+"&text="+content;
                                    axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                }else {
                                    let content = "\xF0\x9F\x94\xB4 " + newLenhcho.direction + " " + newLenhcho.pair   + "\n ENTRY: " + newLenhcho.price + "\nVolume: " + newLenhcho.lot + " lot" + "\n SL: " + newLenhcho.sl + "\n TP: " + newLenhcho.tp;
                                    let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-"+chatId+"&text="+content;
                                    axios.get(stringTelegram).then((info)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
                                }
                            }
                        });
                    }                        
                }
            }
        });
    }

}