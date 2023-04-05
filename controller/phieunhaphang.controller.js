const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const _ = require('lodash');
const Phieunhaphang = db.phieunhaphang;
const Chuyen = db.chuyen;
const Chiphi = db.chiphichuyenxe

exports.savemathang = async (req,res) => {
    let newPnh = Phieunhaphang({
        idchuyen : req.body.idchuyen,
        biensoxe: req.body.biensoxe,
        iduser: req.body.iduser,// mã khách hàng
        tiencuoc:req.body.tiencuoc,// tiền cươc xe của 1 loại hàng
        lotrinh: req.body.lotrinh, // lộ trình vận chuyển đi hay lộ trình hàng về
        ngaynhap: _.now(),
        noidungdonhang:req.body.noidungdonhang, // nôi dung đơn hàng. vd: gửi gạch đi phú quốc
        diadiembochang:req.body.diadiembochang,  // Địa chỉ bọc hàng
        hinhthucthanhtoan:req.body.hinhthucthanhtoan, // ghi no => 1, truc tiep => 2, thanh toan khi nhan hang => 3 
        ghichu: req.body.ghichu, // ghi chú đơn hàng
        tennguoinhan: req.body.tennguoinhan,
        sdtnguoinhan: req.body.sdtnguoinhan,
        diachinguoinhan: req.body.diachinguoinhan,
        trangthai: req.body.trangthai, // 0 lưu dự định nhập. 1 hoàn thành việc nhập. 2, khóa chuyến hàng
        status01: 0, 
        status02: 0, 
        status03: 0, 
        status04: 0, 
        status05: 0 
    });
    newPnh.save(async function(e){
        if(e) {
            return res.status(200).send(new Response(1001,"lưu không thành công ", null));
        } else {
            return res.status(200).send(new Response(0,"lưu thành công ", newPnh));
        }
    })
}

exports.getLists = async (req,res) => {
    let allData = await Phieunhaphang.find(req.body.filters)
    .populate('iduser',{password:0});
    if(req.body.pageNum == 0 && req.body.pageSize == 0) {
        res.status(200).send(new Response(0,"data sucess",allData));
    } else {
        let n = 0
        if(req.body.pageNum == 1) {
            n = req.body.pageNum - 1;
        }
        let lst = await Phieunhaphang.find(req.body.filters).limit(req.body.pageSize).skip(req.body.pageSize*n)
        .populate('iduser',{password:0});
        let data = commonfun.dataReponse(allData,lst,req.body.pageNum,req.body.pageSize);
        res.status(200).send(new Response(0,"data sucess",data));
    }
}

exports.getDetail = async (req,res) => {
    let pnh = await Phieunhaphang.findOne({_id: req.params.id});
    if(pnh) {
        res.status(200).send(new Response(0,"data sucess",pnh));
    } else {
        res.status(200).send(new Response(0,"data null",null));
    }
}

exports.update = async (req,res) => {

    Phieunhaphang.updateOne({_id:req.body.id},{$set:{
        iduser:req.body.iduser,
        noidungdonhang:req.body.noidungdonhang,
        tiencuoc:req.body.tiencuoc,
        diadiembochang:req.body.diadiembochang,
        hinhthucthanhtoan: req.body.hinhthucthanhtoan,
        lotrinh: req.body.lotrinh,
        ghichu: req.body.ghichu,
        tennguoinhan: req.body.tennguoinhan,
        sdtnguoinhan: req.body.sdtnguoinhan,
        diachinguoinhan: req.body.diachinguoinhan
    }})
    .then(data => {
        console.log(data.modifiedCount + " Update Product " + req.body.id);
        return res.status(200).send(new Response(0,"Data sucess ", data.modifiedCount));
    })  
}

exports.delete = async (req, res) => {
    console.log(req.body);
    let id = req.body.ids;
    Phieunhaphang.deleteOne({_id:id})
    .then(data => {
        res.status(200).send(new Response(0,"delete success !", data));
    },err=>{
        res.status(200).send(new Response(1001,"error delete !", null));
    })
}

exports.ExportDataPDFChuyen = async (req,res) => {
    // get chuyen id
    let odt = "";
    let id = req.body.id;
    if(id && id.length==24) {
        let c = await Chuyen.findOne({_id:id})
        .populate('biensoxe')
        .populate('idtai')
        .populate('idphu');
    
        if(c['soodt'] && c['soodt'] != "") {
            odt = c['soodt'];
        } else {
            odt = await commonfun.fnGetODT();
            await Chuyen.updateOne({_id:id},{$set:{soodt:odt}})
        }
        // get list detail id chuyen
        let lstpnh = await Phieunhaphang.find({idchuyen:id})
        .populate('iduser',{password:0});
    
        // get list chi phi id chuyen
        let lstchiphi = await Chiphi.find({idchuyen: id});
    
        let resdata= {
            odt: odt,
            chuyen: c,
            lstproduct: lstpnh,
            lstchiphi: lstchiphi
        }
        return res.status(200).send(new Response(0,"data success !", resdata));
    } else {
        return res.status(200).send(new Response(1001,"data null !", null));
    }
   
}
