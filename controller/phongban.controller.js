const db = require("../model");
let Responses = require('../common/response');
const common = require("../common/functionCommon");
let Response = Responses.Response
const Phongban = db.phongban;


exports.addPhongban = async (req,res) => {
    let data = req.body;
    console.log(data);
    let newPhongban = new Phongban({
        tenphongban: data.tenphongban,
        fatherId: data.fatherId,
        state : data.state,
        orderNum: data.orderNum
    })
    newPhongban.save(async function(e){
        if(e) {
           res.status(500).send(new Response(1001,"Lỗi chèn phòng ban !", null));
        }else {
           res.status(200).send(new Response(0,"add sucess !", newPhongban));
        }
    })

}

exports.editPhongban = async (req,res) => {
    let idPhongban = req.body.id;
    Phongban.updateOne({_id: idPhongban},{$set:{state: req.body.state,tenphongban: req.body.tenphongban}})
    .then(data => {
         if(data.modifiedCount==1){
            res.status(200).send(new Response(0,"add sucess !", data));
         }else {
            res.status(400).send(new Response(0,"no update !", data));
         }
    },err=>{
        res.status(500).send(new Response(1001,"Lỗi sữa phòng ban !", null));
    })
    
}


exports.delPhongban = async (req,res) => {
    let id = req.body.id;
    Phongban.deleteOne({_id:id})
    .then(data => {
        res.status(200).send(new Response(0,"delete sucess !", data));
    },err=>{
        res.status(500).send(new Response(1001,"Lỗi xóa phòng ban !", null));
    })
}

exports.getIdPhongban = async (req,res) => {
    let id = req.body.id;
    Phongban.findOne({_id:id})
    .then(data=>{
        res.status(200).send(new Response(0,"data sucess !", data));
    },err=>{
        res.status(500).send(new Response(1001,"not id data phòng ban !", null));
    })
}

exports.getAllPhongban = async (req,res) => {
   let lst = await Phongban.find({});
   let pageNum = req.body.pageNum;
   let pageSize = req.body.pageSize;

   if(lst.length > 0)  {
      let commonfun = common.dataReponse(lst,pageNum,pageSize);
      res.status(200).send(new Response(0,"data sucess !", commonfun));
   } else {
      res.status(500).send(new Response(1001,"not all data phòng ban !", null));
   }
}
