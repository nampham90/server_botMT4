const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Nhatkykh = db.nhatkykh;

exports.getLists = async (req,res) => {
    console.log({userId:req.userID})
    let gt = "01/01/1970";
    let lt = "01/01/2100";
    if(req.body.filters.ngaybatdau) {
        gt = filters.ngaybatdau;
    }
    if(req.body.filters.ngayketthuc) {
        lt = filters.ngayketthuc;
    }
    let sreach = {};
    sreach.ngay = {$gte:gt,$lt:lt};
    sreach.trangthai = req.body.filters.trangthai;
    sreach.iduser = req.body.filters.iduser;
    console.log(sreach);
    let allData = await Nhatkykh.find(sreach)
    .populate('idphieunhaphang');
    if(req.body.pageNum == 0 && req.body.pageSize == 0) {
        res.status(200).send(new Response(0,"data sucess",allData));
    } else {
        let n = 0
        if(req.body.pageNum == 1) {
            n = req.body.pageNum - 1;
        }
        let lst = await Nhatkykh.find(sreach).limit(req.body.pageSize).skip(req.body.pageSize*n)
        .populate('idphieunhaphang');
        let data = commonfun.dataReponse(allData,lst,req.body.pageNum,req.body.pageSize);
        res.status(200).send(new Response(0,"data sucess",data));
    }
}

exports.tatToan = async (req,res) => {
    let nth = req.userID;
    console.log(req.body);
    let iduser = req.body.iduser;
    let sotientra = req.body.sotientra;
    await commonfun.ghiNhatkyTatToan(iduser,sotientra);
    await commonfun.ghiNhatkyhethong(nth,"Tất toán nợ cho id " + iduser, "nhatkykh");
    res.status(200).send(new Response(0,"data sucess",1));
}