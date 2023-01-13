const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Xe = db.xe;


exports.PostAllXe = async (req,res) => {
    if(req.body.pageSize == 0 && req.body.pageNum == 0) {
        let alldata = await Xe.find({});
        return res.status(200).send(new Response(0,"Data sucess", alldata));
    } else {
        let n = req.body.pageNum - 1;
        let alldata = await Xe.find(req.body.filters);
        let lst = await Xe.find(req.body.filters).limit(req.body.pageSize).skip(req.body.pageSize*n);
        let data = commonfun.dataReponse(alldata,lst,req.body.pageNum,req.body.pageSize);
        return res.status(200).send(new Response(0,"Data sucess", data));
    }

}

//list xe free
exports.getlistXefree = async (req,res) => {
   let listxefree =   await Xe.find({trangthai: false});
   return res.status(200).send(new Response(0,"Data sucess", listxefree));
}

//list xe runing
exports.getlistXerun = async (req,res) => {
   let listxerun =   await Xe.find({trangthai: true});
   return res.status(200).send(new Response(0,"Data sucess", listxerun));
}

exports.CreateXe = async (req,res) => {
    console.log(req.body)
    let image = "/public/img/iconxetai.png";
    let newXe = new Xe({
        biensoxe: req.body.biensoxe,
        anhdaidien: image,
        tenxegoinho: req.body.tenxegoinho,
        trongtai: req.body.trongtai,
        trangthai: false
    });

    newXe.save(async function(e){
        if(e){
            res.status(500).send(new Response(1001,"Lỗi khi khởi tạo Xe !", null));
        }else {
            res.status(200).send(new Response(0,"Create Sucess !", newXe));
        }
    })
}

exports.getDetail = async (req,res) => {
    console.log(req.params.id);
    let id = req.params.id;
    let x = await Xe.findOne({_id:id});
    if(x){
        res.status(200).send(new Response(0,"Data Sucess", x));
    }else {
        res.status(500).send(new Response(1000, "Data Null", null));
    }
}

exports.Updatetrangthai = async (req,res) => {
    Xe.updateOne({_id: req.body.id},{$set: {trangthai: req.body.trangthai, vitrihientai:req.body.vitrihientai}})
    .then(data => {
        console.log(data.modifiedCount + " Update Trang thái Xe " + req.body.id);
        return res.status(200).send(new Response(0,"Data sucess ", data.modifiedCount));
    },err=>{
        res.status(200).send(new Response(1001,"error Update !", null));
    })
}

exports.updateXe = async (req,res) => {
    Xe.updateOne({_id: req.body.id},{$set: {biensoxe: req.body.biensoxe, tenxegoinho: req.body.tenxegoinho, trongtai: req.body.trongtai, anhdaidien: "/public/img/iconxetai.png"}})
    .then(data => {
        console.log(data.modifiedCount + " Update Xe success " + req.body.id);
        return res.status(200).send(new Response(0,"Data sucess ", data.modifiedCount));
    }, err => {
        res.status(200).send(new Response(1001,"error Update !", null));
    })
}