const express = require("express");
const dotenv = require("dotenv")
dotenv.config();

const app = express();


app.listen(process.env.POST | 3000);

// r59FrrlOIxXUDlh3
//connect database------------------------------
const db = require("./model");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
//mode
const order = require("./model/order");

const axios = require("axios");

require("./routers/order.route")(app);
require("./routers/account.route")(app);
require("./routers/lenhcho.route")(app);


// app.post("/orders", function(req,res){
//     let stringFromServer = JSON.stringify(req.body);
//     stringFromServer = stringFromServer.substring(2);
//     stringFromServer = stringFromServer.replace('}\\u0000":""','');
//     stringFromServer = stringFromServer.replace(/\\/g,'');
//     stringFromServer = stringFromServer.replace('u0000":""','');
//     let json = JSON.parse(stringFromServer);
//     if(json.orders){
//         json.orders.forEach(function(o){
//             if(o.sl != "0" && o.tp != "0"){
//                 let orderType = "SELL";
//                 if(o.direction != 1) {
//                     orderType = "BUY";
//                 } 
//                 let newOrder = new order({
//                     ticket: o.ticket,
//                     pair: o.pair,
//                     direction: orderType,
//                     lot: o.lot,
//                     price: o.price,
//                     sl: o.sl,
//                     tp: o.tp,
//                     opentime: o.opentime,
//                     comment: o.comment,
//                     orderProfit: o.orderProfit
//                 })
//                 newOrder.save(function(e){
//                     if(e){}
//                     else{
        
//                         //5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M
//                         //BotNamPhamTelegram
//                         //username
//                         //BotNamPhamTelegram_bot
//                         //https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/getUpdates
//                         //https://api.telegram.org/botbot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-635826973&text={notification_text}
        
//                         //-635826973
//                         let content = "Order " + newOrder.ticket + " " + newOrder.pair + " " + newOrder.direction + " Price " + newOrder.price + " SL " + newOrder.sl + " TP " + newOrder.tp;
//                         let stringTelegram = "https://api.telegram.org/bot5575919434:AAEOiu_pWYpmGp4QtAF-k388QV-Rke0n44M/sendMessage?chat_id=-635826973&text="+content;
//                         axios.get(stringTelegram).then((res)=>{console.log("send thanh cong")}).catch((e2)=>{console.log(e2.message)});
//                     }
//                 })
//             }
//         });
//     }
    
//     res.end();
// })
