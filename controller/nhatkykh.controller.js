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
        gt = req.body.filters.ngaybatdau;
    }
    if(req.body.filters.ngayketthuc) {
        lt = req.body.filters.ngayketthuc;
    }
    let sreach = {};
    sreach.ngay = {$gte:gt,$lt:lt};
    sreach.trangthai = req.body.filters.trangthai;
    sreach.iduser = req.body.filters.iduser;
    sreach.ghichu = req.body.filters.ghichu;
    console.log(sreach);
    let allData = await Nhatkykh.find(sreach).sort( { "ngay": -1 } )
    .populate('idphieunhaphang')
    if(req.body.pageNum == 0 && req.body.pageSize == 0) {
        res.status(200).send(new Response(0,"data sucess",allData));
    } else {
        let n = 0
        if(req.body.pageNum == 1) {
            n = req.body.pageNum - 1;
        }
        let lst = await Nhatkykh.find(sreach).sort( { "ngay": -1 } )
        .limit(req.body.pageSize).skip(req.body.pageSize*n)
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

exports.thanhtoanmotphan = async (req,res) => {
    console.log(req.body);
    let iduser = req.body.iduser;
    let listidpn = req.body.listidpn;
    let i = 0;
    for(let element of listidpn) {
       let n =  await Nhatkykh.updateOne({iduser:iduser, idphieunhaphang: element},{$set: {chukyno:1, ghichu: "Đã thanh toán"}});
       if(n.modifiedCount == 1) {
         i++
       }
    }
    if(i > 0) {
        res.status(200).send(new Response(0,"data sucess",1));
    } else {
        res.status(200).send(new Response(1001,"update fail",null));
    }

}

exports.thanhtoan = async (req,res) => {
    let iduser = req.body.iduser;
    let idphieunhaphang = req.body.idphieunhaphang;
    let update = await Nhatkykh.updateOne({iduser:iduser,idphieunhaphang:idphieunhaphang},{$set: {chukyno:1, ghichu: "Đã thanh toán"}});
    if(update.modifiedCount == 1) {
        res.status(200).send(new Response(0,"data sucess",1));
    } else {
        res.status(200).send(new Response(1001,"update fail",null));
    }
}