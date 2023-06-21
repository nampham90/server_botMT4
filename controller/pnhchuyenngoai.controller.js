const db = require("../model");
const dbCon = require('../common/DBConnect');
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Pnhchuyenngoai = db.pnhchuyenngoai;

// list all 
exports.PostAllPnhchuyenngoai = async (req,res) => {
    if(req.body.pageSize == 0 && req.body.pageNum == 0) {
        let alldata = await Pnhchuyenngoai.find({});
        return res.status(200).send(new Response(0,"Data sucess", alldata));
    } else {
        let n = req.body.pageNum - 1;
        let alldata = await Pnhchuyenngoai.find(req.body.filters);
        let lst = await Pnhchuyenngoai.find(req.body.filters).limit(req.body.pageSize).skip(req.body.pageSize*n);
        let data = commonfun.dataReponse(alldata,lst,req.body.pageNum,req.body.pageSize);
        return res.status(200).send(new Response(0,"Data sucess", data));
    }
}

// tao 
exports.PostCreatePnhchuyenngoai = async (req,res) => {
    console.log(req);
    if(checknx == true) {
        res.status(200).send(new Response(1001,"Nguồn xe tồn tại !", null));
    } else {
        let newPnhchuyenngoai = new Pnhchuyenngoai({
            idchuyenngoai: req.body.idchuyenngoai, // id chuyen ngoai
            biensoxe: req.body.biensoxe,
            iduser: req.body.iduser, // id user
            tiencuocnhan: req.body.tiencuocnhan,
            ngaynhap: req.body.ngaynhap,
            tenhang: req.body.tenhang,
            diadiembochang: req.body.diadiembochang,
            thongtintrahang: req.body.thongtintrahang,
            htttkhachhang: req.body.htttkhachhang,
            tiencuoctra: req.body.tiencuoctra,
            htttxengoai: req.body.htttxengoai,
            ghichu: req.body.ghichu,
            status01: 0,
            status02: 0,
            status03: 0,
            status04: 0,
            status05: 0
        });
        newPnhchuyenngoai.save(async function(e){
            if(e){
                res.status(200).send(new Response(1001,"Lỗi khi khởi tạo Xe !", null));
            }else {
                res.status(200).send(new Response(0,"Create Sucess !", newPnhchuyenngoai));
            }
        })
    }
    
}

// update 
exports.PostUpdatePnhchuyenngoai = async (req,res) => {
    console.log(req);
    Pnhchuyenngoai.updateOne({_id: req.body.id},{$set: {tiencuocnhan: req.body.tiencuocnhan, tenhang: req.body.tenhang, diadiembochang: req.body.diadiembochang, thongtintrahang: req.body.thongtintrahang, htttkhachhang: req.body.htttkhachhang, tiencuoctra: req.body.tiencuoctra, htttxengoai: req.body.htttxengoai, ghichu: req.body.ghichu}})
    .then(data => {
        console.log(data.modifiedCount + " Update Xe success " + req.body.id);
        return res.status(200).send(new Response(0,"Data sucess ", data.modifiedCount));
    }, err => {
        res.status(200).send(new Response(1001,"error Update !", null));
    })
}

// update status
exports.PostUpdateStatusPnhchuyenngoai = async (req,res) => {
    console.log(req);
    Pnhchuyenngoai.updateOne({_id: req.body.id},{$set: {status01: req.body.status01, status02: req.body.status02, status03: req.body.status03, status04: req.body.status04, status05: req.body.status05}})
    .then(data => {
        console.log(data.modifiedCount + " Update Xe success " + req.body.id);
        return res.status(200).send(new Response(0,"Data sucess ", data.modifiedCount));
    }, err => {
        res.status(200).send(new Response(1001,"error Update !", null));
    })
}

// delete 
exports.PostDeletePnhchuyenngoai = async (req,res) => {
    console.log(req);
}

// delete all 
exports.PostDeleteAllPnhchuyenngoai = async (req,res) => {
    console.log(req);
}

// get detail 
exports.PostGetDetail = async (req,res) => {
    console.log(req);
}
