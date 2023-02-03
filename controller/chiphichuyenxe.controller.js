const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const ChiphiChuyenxe = db.chiphichuyenxe;


exports.getLists = async (req,res) => {
    console.log(req.body)
    let idchuyen = req.body.id;
    let lst = await ChiphiChuyenxe.find({idchuyen:idchuyen});
    console.log(lst);
    return res.status(200).send(new Response(0,"Data sucess ", lst));
}

exports.updateLists = async (req,res) => {
    console.log(req.body);
    let idchuyen = req.body.id;
    let lst = req.body.lstchiphi;
    if(lst.length > 0 && req.body.trangthai == 4) {
       let i = 0;
       for(let element of lst) {
         let n = await  ChiphiChuyenxe.updateOne({idchuyen:idchuyen,tenchiphi:element.tenchiphi},{$set: {sotien:element.sotien, ghichu:element.ghichu}});
         if(n.modifiedCount == 1) {
            i++;
         }
       }
       if(i == lst.length) {
          return res.status(200).send(new Response(0,"update sucess ", i));
       } else {
          return res.status(200).send(new Response(0," update 1 phần ", i));
       }
    } else {
        return res.status(200).send(new Response(1001,"Data gửi lên không được chấp nhận ", null));
    }
}