const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Nguonxe = db.nguonxe;

// list all nguon xe
exports.PostAllNguonXe = async (req,res) => {
    if(req.body.pageSize == 0 && req.body.pageNum == 0) {
        let alldata = await Nguonxe.find({});
        return res.status(200).send(new Response(0,"Data sucess", alldata));
    } else {
        let n = req.body.pageNum - 1;
        let alldata = await Nguonxe.find(req.body.filters);
        let lst = await Nguonxe.find(req.body.filters).limit(req.body.pageSize).skip(req.body.pageSize*n);
        let data = commonfun.dataReponse(alldata,lst,req.body.pageNum,req.body.pageSize);
        return res.status(200).send(new Response(0,"Data sucess", data));
    }
}

// tao nguon xe
exports.PostCreateNguonXe = async (req,res) => {
    let checknx = await checknguonxe(req.body.datacd);
    if(checknx == true) {
        res.status(200).send(new Response(1001,"Nguồn xe tồn tại !", null));
    } else {
        let newNguonxe = new Nguonxe({
            datacd: req.body.datacd,
            datanm: req.body.datanm,
            datarnm: req.body.datarnm,
            sodienthoai: req.body.sodienthoai,
            diachi: req.body.diachi,
            thongtinthanhtoan1: req.body.thongtinthanhtoan1,
            thongtinthanhtoan2: req.body.thongtinthanhtoan2,
            status01: 0,
            status02: 0,
            status03: 0,
            status04: 0,
            status05: 0
        });
        newNguonxe.save(async function(e){
            if(e){
                res.status(200).send(new Response(1001,"Lỗi khi khởi tạo Xe !", null));
            }else {
                res.status(200).send(new Response(0,"Create Sucess !", newNguonxe));
            }
        })
    }
    
}

// update nguon xe
exports.PostUpdateNguonXe = async (req,res) => {
    Nguonxe.updateOne({_id: req.body.id},{$set: {datacd: req.body.datacd, datanm: req.body.datanm, datarnm: req.body.datarnm, sodienthoai: req.body.sodienthoai, diachi: req.body.diachi, thongtinthanhtoan1: req.body.thongtinthanhtoan1, thongtinthanhtoan2: req.body.thongtinthanhtoan2}})
    .then(data => {
        console.log(data.modifiedCount + " Update Xe success " + req.body.id);
        return res.status(200).send(new Response(0,"Data sucess ", data.modifiedCount));
    }, err => {
        res.status(200).send(new Response(1001,"error Update !", null));
    })
}

// update status
exports.PostUpdateStatusNguonXe = async (req,res) => {
    Nguonxe.updateOne({_id: req.body.id},{$set: {status01: req.body.status01, status02: req.body.status02, status03: req.body.status03, status04: req.body.status04, status05: req.body.status05}})
    .then(data => {
        console.log(data.modifiedCount + " Update Xe success " + req.body.id);
        return res.status(200).send(new Response(0,"Data sucess ", data.modifiedCount));
    }, err => {
        res.status(200).send(new Response(1001,"error Update !", null));
    })
}

// delete nguon xe
exports.PostDeleteNguonXe = async (req,res) => {
    let id = req.body.id;
    Nguonxe.deleteOne({_id:id})
    .then(data => {
        res.status(200).send(new Response(0,"delete sucess !", data));
    },err=>{
        res.status(200).send(new Response(1001,"Lỗi xóa nguồn xe !", null));
    })
}

// delete all nguon xe
exports.PostDeleteAllNguonXe = async (req,res) => {
    console.log(req);
}

// get detail 
exports.PostGetDetail = async (req,res) => {
    let id = req.body.id;
    let nx = await Nguonxe.findOne({_id: id});
    if (nx) {
        return res.status(200).send(new Response(0,"Data sucess ", nx));
    } else {
        return res.status(200).send(new Response(1001,"Data null ", null));
    }
    
}

// check nguon xe
async function  checknguonxe(datacd) {
    let nxe = await Nguonxe.findOne({datacd: datacd});
    if(nxe) {
        return true;
    } else {
        return false;
    }
}