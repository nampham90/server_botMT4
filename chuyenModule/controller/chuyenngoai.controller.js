const db = require("../../model");
const dbCon = require("../../common/DBConnect");
let Responses = require('../../common/response');
let Response = Responses.Response
let commonfun = require('../../common/functionCommon');
const _ = require('lodash');
const { emailAdmin } = require("../../common/const");
const Chuyenngoai = db.chuyenngoai;
const Chitietchuyenngoai = db.chitietchuyenngoai;
const Congnoxengoai = db.congnoxengoai;
const Nhatkykh = db.nhatkykh;
const Phieunhaphang = db.phieunhaphang;

// list all 
exports.PostAllChuyenngoai = async (req,res) => {
    let filters = req.body.filters;
    let gt = "01/01/1970";
    let lt = "01/01/2100";
    let sreach = {};
    if(filters.ngaybatdau) {
        gt = filters.ngaybatdau;
    }
    if(filters.ngayketthuc) {
        lt = filters.ngayketthuc;
    }
    sreach.ngayvanchuyen = {$gte:new Date(gt),$lte: new Date(commonfun.fnEndSearch(lt))};
    if(filters.biensoxe) {
        sreach.biensoxe = filters.biensoxe;
    }
    if(filters.nguonxe) {
        sreach.nguonxe = filters.nguonxe;  
    }
    if(filters.soodn) {
        sreach.soodn = filters.soodn;
    }
    if(filters._id) {
        sreach._id = filters._id;
    }
    if(req.body.pageSize == 0 && req.body.pageNum == 0) {
        let alldata = await Chuyenngoai.find({})
        .populate('nguonxe');
        return res.status(200).send(new Response(0,"Data sucess", alldata));
    } else {
        if(req.body.filters._id == "") {
            req.body.filters._id = undefined;
        }
        let n = req.body.pageNum - 1;
        let alldata = await Chuyenngoai.find(sreach);
        let lst = await Chuyenngoai.find(sreach).limit(req.body.pageSize).skip(req.body.pageSize*n)
        .populate('nguonxe');
        let data = commonfun.dataReponse(alldata,lst,req.body.pageNum,req.body.pageSize);
        return res.status(200).send(new Response(0,"Data sucess", data));
    }
}

async function CheckIDChuyenngoai(id) {
    if(!id || id.length != 24) return false
    let cn = await Chuyenngoai.findOne({_id:id});
    if (cn) return true;
    return false;
}

async function CheckCongnoChuyenngoai(id) {
    if(!id || id.length != 24) return false
    let cn = await Congnoxengoai.findOne({iddonhang:id});
    if (cn) return true;
    return false;
}

// create cong nơ xe ngoai
async function registerCongNoXeNgoai(nguonxe, iddonhang, biensoxe, tentaixe, sodienthoai, sotienno, ghichu, status02) {
     let cnxengoai = new Congnoxengoai({
        nguonxe: nguonxe,
        iddonhang: iddonhang,
        soID: null,
        ngaynhap : _.now(),
        biensoxe: biensoxe,
        tentaixe: tentaixe,
        sodienthoai: sodienthoai,
        sotienno: sotienno,
        sohdttxn:"",
        status01: 0, // 0. chưa thanh toán. 1. đã thanh toán
        status02: status02, // 0. không ghi công nợ. 1 . có ghi công nợ
        status03: 0, 
        status04: 0,
        status05: 0,
        ghichu: ghichu
     });
     await cnxengoai.save();
}

// tao 
const CreateChuyenngoaiProcess = require("../../chuyenModule/process/chuyenngoaiProcess/createChuyenngoaiProcess");
const GetChuyenNgoaiProcess = require('../../chuyenModule/process/chuyenngoaiProcess/getChuyenngoaiProcess');
exports.PostCreateChuyenngoai = async (req,res) => {
    req.body.nguoiphathanh = req.userID;
    try {
        const createChuyenngoaiProcess = new CreateChuyenngoaiProcess(dbCon.dbDemo);
        await createChuyenngoaiProcess.start();
        const session = createChuyenngoaiProcess.transaction;
        let soODN = await createChuyenngoaiProcess.create(req.body,session);
        await createChuyenngoaiProcess.commit();
        const getChuyenNgoaiProcess = new GetChuyenNgoaiProcess(dbCon.dbDemo);
        await getChuyenNgoaiProcess.start();
        const session1 = getChuyenNgoaiProcess.transaction;
        let data = {
            soODN: soODN,
            mode: "create"
        }
        let response = await getChuyenNgoaiProcess.getDetail(data,session1);
        await getChuyenNgoaiProcess.commit();
        return res.status(200).send(new Response(0,"Data sucess", response));
    } catch (error) {
        return res.status(200).send(new Response(1001,"Lỗi hệ thống", error.message));
    }
}

// update 
exports.PostUpdateChuyenngoai = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

// update status
exports.PostUpdateStatusChuyenngoai = async (req,res) => {
    Chuyenngoai.updateOne({_id: req.body.id},{$set: {status01: req.body.status01, status02: req.body.status02, status03: req.body.status03, status04: req.body.status04, status05: req.body.status05}})
    .then(data => {
        return res.status(200).send(new Response(0,"Data sucess ", data.modifiedCount));
    }, err => {
        return res.status(200).send(new Response(1001,"error Update !", null));
    })
}

// cập nhật khóa chuyến ngoài không cho update
exports.PostUpdateStatus02 = async (req,res) => {
   await  Chuyenngoai.updateOne({_id: req.body.id},{$set: {status02: 1}})
   await Chitietchuyenngoai.updateMany({idchuyenngoai: req.body.id},{$set: {status03: 1}});
   return res.status(200).send(new Response(0,"Data sucess ", 1));
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
    let cn = await Chuyenngoai.findOne({_id:req.body.id})
    let lstdetail = await Chitietchuyenngoai.find({idchuyenngoai: req.body.id});
    let reqdata = {
        resHeader: cn,
        listdetail: lstdetail
    }
    if(cn) {
        res.status(200).send(new Response(0,"data success !", reqdata));
    } else {
        res.status(200).send(new Response(1001,"Chuyến hàng không tồn tại !", null));
    }
}

exports.PostExportDetail = async (req,res) => {
    let odn = "";
    let cn = await Chuyenngoai.findOne({_id:req.body.id}).populate('nguonxe');
    if(cn['soodn'] && cn['soodn'] != "") {
        odn = cn['soodn'];
    } else {
        odn = await commonfun.fnGetODN();
        await Chuyenngoai.updateOne({_id:req.body.id},{$set:{soodn:odn}})
    }
    if(odn != "") {
        await Chitietchuyenngoai.updateMany({idchuyenngoai:req.body.id},{$set:{soodn:odn}});
    }
    let lstdetail = await Chitietchuyenngoai.find({idchuyenngoai: req.body.id});
    let reqdata = {
        odn: odn,
        resHeader: cn,
        listdetail: lstdetail
    }
    if(cn) {
        res.status(200).send(new Response(0,"data success !", reqdata));
    } else {
        res.status(200).send(new Response(1001,"error Update !", null));
    }
}
