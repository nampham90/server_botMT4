const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Chuyenngoai = db.chuyenngoai;

// list all 
exports.PostAllChuyenngoai = async (req,res) => {
    if(req.body.pageSize == 0 && req.body.pageNum == 0) {
        let alldata = await Chuyenngoai.find({});
        return res.status(200).send(new Response(0,"Data sucess", alldata));
    } else {
        let n = req.body.pageNum - 1;
        let alldata = await Chuyenngoai.find(req.body.filters);
        let lst = await Chuyenngoai.find(req.body.filters).limit(req.body.pageSize).skip(req.body.pageSize*n);
        let data = commonfun.dataReponse(alldata,lst,req.body.pageNum,req.body.pageSize);
        return res.status(200).send(new Response(0,"Data sucess", data));
    }
}

// tao 
exports.PostCreateChuyenngoai = async (req,res) => {
    console.log(req);
    if(checknx == true) {
        res.status(200).send(new Response(1001,"Nguồn xe tồn tại !", null));
    } else {
        let newChuyenngoai = new Chuyenngoai({
            ngaydi: req.body.ngaydi,
            ngayve: req.body.ngayve,
            nguonxe: req.body.nguonxe, // id nguon xe
            biensoxe: req.body.datarnm,
            tentaixe: req.body.tentaixe,
            sodienthoai: req.body.sodienthoai,
            changduong: req.body.changduong,
            status01: 0,
            status02: 0,
            status03: 0,
            status04: 0,
            status05: 0,
            ghichu: req.body.ghichu
        });
        newChuyenngoai.save(async function(e){
            if(e){
                res.status(200).send(new Response(1001,"Lỗi khi khởi tạo Xe !", null));
            }else {
                res.status(200).send(new Response(0,"Create Sucess !", newChuyenngoai));
            }
        })
    }
    
}

// update 
exports.PostUpdateChuyenngoai = async (req,res) => {
    console.log(req);
    Chuyenngoai.updateOne({_id: req.body.id},{$set: {nguonxe: req.body.nguonxe, biensoxe: req.body.biensoxe, tentaixe: req.body.tentaixe, sodienthoai: req.body.sodienthoai, changduong: req.body.changduong}})
    .then(data => {
        console.log(data.modifiedCount + " Update Xe success " + req.body.id);
        return res.status(200).send(new Response(0,"Data sucess ", data.modifiedCount));
    }, err => {
        res.status(200).send(new Response(1001,"error Update !", null));
    })
}

// update status
exports.PostUpdateStatusChuyenngoai = async (req,res) => {
    console.log(req);
    Chuyenngoai.updateOne({_id: req.body.id},{$set: {status01: req.body.status01, status02: req.body.status02, status03: req.body.status03, status04: req.body.status04, status05: req.body.status05}})
    .then(data => {
        console.log(data.modifiedCount + " Update Xe success " + req.body.id);
        return res.status(200).send(new Response(0,"Data sucess ", data.modifiedCount));
    }, err => {
        res.status(200).send(new Response(1001,"error Update !", null));
    })
}

// delete 
exports.PostDeleteChuyenngoai = async (req,res) => {
    console.log(req);
}

// delete all 
exports.PostDeleteAllChuyenngoai = async (req,res) => {
    console.log(req);
}

// get detail 
exports.PostGetDetail = async (req,res) => {
    console.log(req);
}
