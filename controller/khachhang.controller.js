const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Khachhang = db.user;
const Nhatkykh = db.nhatkykh;

function KhachhangObject() {
    this.id = "";
    this.makhachhang = "";
    this.name = ""; 
    this.dienthoai = "";
    this.diachi = ''; // tiền đưa trước
    this.sotienno = 0;
}

exports.getDetail = async (req,res) => {
    let id = req.params.id;
    let kh = await Khachhang.findOne({_id:id});
    if (kh) {
        let Khang = new KhachhangObject();
        Khang.id = kh._id;
        Khang.makhachhang = kh.makhachhang;
        Khang.name = kh.name;
        Khang.dienthoai = kh.dienthoai;
        if(kh.diachi != undefined) {
            Khang.diachi = kh.diachi;
        } else {
            Khang.diachi = "";
        }
        if(kh.groupid != undefined) {
            Khang.groupid = kh.groupid;
        } else {
            Khang.groupid = "";
        }
        Khang.sotienno =  await commonfun.tongno(kh._id);
        res.status(200).send(new Response(0,"Data success",Khang));
    } else {
        res.status(200).send(new Response(1001,"Khách hàng không tồn tại",null));
    }
}

exports.update = async (req,res) => {
    let id = req.body.id;
    if(id != undefined && id.length == 24){
        let kh = await Khachhang.findOne({_id:id});
        if (kh) {
           let check = await commonfun.fnCheckMakhachhang(req.body.makhachhang);
           if(check == false) {
                Khachhang.updateOne({_id:id}, {$set: {makhachhang:req.body.makhachhang, name:req.body.name,dienthoai: req.body.dienthoai, diachi:req.body.diachi, groupid: req.body.groupid}})
                .then(data => {
                console.log(data.modifiedCount + " update khach hang " + id);
                if(data.modifiedCount == 1){
                    return res.status(200).send(new Response(0,"update success",id));
                } else {
                    return  res.status(200).send(new Response(1001,"update fail",id));
                }
            })
           } else {
             return res.status(200).send(new Response(1001,"Mã khách hàng tồn tại",null));
           }
           
        } else {
            return res.status(200).send(new Response(1001,"Khách hàng không tồn tại",null));
        }
    } 
}


exports.getLists = async (req,res) => {
    let allData = await Khachhang.find(req.body.filters);
    if(req.body.pageNum == 0 && req.body.pageSize ==0) {
        res.status(200).send(new Response(0,"data sucess",allData));
    } else {
        let n = req.body.pageNum - 1;
        let lst = await Khachhang.find(req.body.filters).limit(req.body.pageSize).skip(req.body.pageSize*n);
        let data = commonfun.dataReponse(allData,lst,req.body.pageNum,req.body.pageSize);
        let list = [];    
        for(let element of data.list) {
            let obj = new KhachhangObject();
            obj.id = element._id;
            obj.makhachhang = element.makhachhang;
            obj.name = element.name;
            obj.dienthoai = element.dienthoai;
            if(element.diachi != undefined){
                obj.diachi = element.diachi;
            } else {
                obj.diachi = "";
            }
            if(element.groupid != undefined) {
                obj.groupid = element.groupid;
            } else {
                obj.groupid = "";
            }
            obj.sotienno = await commonfun.tongno(element._id);
            list.push(obj);
        }
        data.list = list;
        res.status(200).send(new Response(0,"data sucess",data));
    }
}

exports.searchParams = async (req,res) => {
    const  idKhachhang = "632ebaf77e9ad9aeef4e3d27";
    let allData = await Khachhang.find({ $text:{ $search: req.body.filters}, phongban_id:idKhachhang});
    if(req.body.pageNum == 0 && req.body.pageSize ==0) {
        res.status(200).send(new Response(0,"data sucess",allData));
    } else {
        let n = req.body.pageNum - 1;
        let lst = await Khachhang.find({$text:{ $search: req.body.filters}, phongban_id:idKhachhang}).limit(req.body.pageSize).skip(req.body.pageSize*n);
        let data = commonfun.dataReponse(allData,lst,req.body.pageNum,req.body.pageSize);
        let list = [];    
        for(let element of data.list) {
            let obj = new KhachhangObject();
            obj.id = element._id;
            obj.name = element.name;
            obj.dienthoai = element.dienthoai;
            if(element.diachi != undefined){
                obj.diachi = element.diachi;
            } else {
                obj.diachi = "";
            }
            if(element.groupid != undefined) {
                obj.groupid = element.groupid;
            } else {
                obj.groupid = "";
            }
            obj.sotienno = await commonfun.tongno(element._id);
            list.push(obj);
        }
        data.list = list;
        res.status(200).send(new Response(0,"data sucess",data));
    }
}