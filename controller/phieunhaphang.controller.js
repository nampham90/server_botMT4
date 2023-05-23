const db = require("../model");
const dbCon = require('../common/DBConnect');
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const _ = require('lodash');
const Phieunhaphang = db.phieunhaphang;
const Chuyen = db.chuyen;
const Chiphi = db.chiphichuyenxe

//process
const PhieunhaphangHuybochangProcess = require("../process/phieunhaphangProcess/PhieunhaphangHuybochangProcess");
const Spin00251RegisterProcess = require('../process/spin00251Process/spin00251RegisterProcess');

exports.savemathang = async (req,res) => {
    try {
        let soID = await commonfun.fnGetID();
        //req.body.soID = soID;
        let reqdata = {
            "soID" : soID,
            "iduser": req.body.iduser,
            "hinhthucthanhtoan": req.body.hinhthucthanhtoan,
            "ghichu": req.body.mode,
            "mode": req.body.mode,
            "listsp": [
                {
                    "idchuyen": req.body.idchuyen,
                    "biensoxe": req.body.biensoxe,
                    "noidungdonhang": req.body.noidungdonhang,
                    "tiencuoc": req.body.tiencuoc,
                    "diadiembochang": req.body.diadiembochang,
                    "soluong": req.body.soluong,
                    "trongluong": req.body.trongluong,
                    "khoiluong": req.body.khoiluong,
                    "donvitinh": req.body.donvitinh,
                    "lotrinh": req.body.lotrinh,
                    "makho": req.body.diadiembochang,
                    "tennguoinhan": req.body.tennguoinhan,
                    "sdtnguoinhan": req.body.sdtnguoinhan,
                    "diachinguoinhan": req.body.diachinguoinhan,
                    "ghichu":  req.body.ghichu + ""
                }
            ]
        }
        const spin00251RegisterProcess = new Spin00251RegisterProcess(dbCon.dbDemo);
        await spin00251RegisterProcess.start();
        const session = spin00251RegisterProcess.transaction;
        let data = await spin00251RegisterProcess.register(reqdata,session);
        await spin00251RegisterProcess.commit();
        return  res.status(200).send(new Response(0,"Data sucess ", data));
    } catch (error) {
        return  res.status(200).send(new Response(1001,"Lỗi hệ thống ", error.message));
    }
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
    try {
        const phieunhaphangHuybochangProcess = new PhieunhaphangHuybochangProcess(dbCon.dbDemo);
        await phieunhaphangHuybochangProcess.start();
        const session = phieunhaphangHuybochangProcess.transaction;
        let data = await phieunhaphangHuybochangProcess.huybochang(req.body,session);
        await phieunhaphangHuybochangProcess.commit();
        if(data.msgError != ""){
            return res.status(200).send(new Response(0,"data success !", data));
        }
        return res.status(200).send(new Response(0,"data success !", 1));
    } catch (error) {
        return res.status(200).send(new Response(1001,"Lỗi hệ thống !", error.message));
    }
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
