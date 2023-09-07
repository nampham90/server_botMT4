const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Message = db.message;


// list all 
exports.PostAll = async (req,res) => {
    if(req.body.pageSize == 0 && req.body.pageNum == 0) {
        let alldata = await Message.find({});
        return res.status(200).send(new Response(0,"Data sucess", alldata));
    } else {
        let n = req.body.pageNum - 1;
        let alldata = await Message.find(req.body.filters);
        let lst = await Message.find(req.body.filters).limit(req.body.pageSize).skip(req.body.pageSize*n);
        let data = commonfun.dataReponse(alldata,lst,req.body.pageNum,req.body.pageSize);
        return res.status(200).send(new Response(0,"Data sucess", data));
    }
}

// tao 
exports.PostCreate = async (req,res) => {
    let newMessage = new Message({
        idmsg: req.body.idmsg,
        strmsg: req.body.strmsg,
        status01: 0,
        status02: 0,
        status03: 0,
        status04: 0,
        status05: 0,
    });
    newMessage.save(async function(e){
        if(e){
            res.status(200).send(new Response(1001,"Lỗi khi khởi tạo !", null));
        }else {
            res.status(200).send(new Response(0,"Create Sucess !", newMessage));
        }
    })
    
}

// update 
exports.PostUpdate = async (req,res) => {
    Message.updateOne({_id: req.body.id},{$set: {idmsg: req.body.idmsg, strmsg: req.body.strmsg}})
    .then(data => {
        console.log(data.modifiedCount + " Update Xe success " + req.body.id);
        return res.status(200).send(new Response(0,"Data sucess ", data.modifiedCount));
    }, err => {
        res.status(200).send(new Response(1001,"error Update !", null));
    })
}

// update status
exports.PostUpdateStatus = async (req,res) => {
    Message.updateOne({_id: req.body.id},{$set: {status01: req.body.status01, status02: req.body.status02, status03: req.body.status03, status04: req.body.status04, status05: req.body.status05}})
    .then(data => {
        console.log(data.modifiedCount + " Update Xe success " + req.body.id);
        return res.status(200).send(new Response(0,"Data sucess ", data.modifiedCount));
    }, err => {
        res.status(200).send(new Response(1001,"error Update !", null));
    })
}

// delete 
exports.PostDelete = async (req,res) => {
    console.log(req);
}

// delete all 
exports.PostDeleteAll = async (req,res) => {
    console.log(req);
}

// get detail 
exports.PostGetDetail = async (req,res) => {
    console.log(req);
}