const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const _ = require('lodash');
const Phieunhaphang = db.phieunhaphang;

exports.savemathang = async (req,res) => {
    console.log(req.body);
    let newPnh = Phieunhaphang({
        idchuyen : req.body.idchuyen,
        biensoxe: req.body.biensoxe,
        iduser: req.body.makh,// mã khách hàng
        tiencuoc:req.body.tiencuoc,// tiền cươc xe của 1 loại hàng
        lotrinh: req.body.lotrinh, // lộ trình vận chuyển đi hay lộ trình hàng về
        ngaynhap: _.now(),
        noidungdonhang:req.body.noidungdonhang, // nôi dung đơn hàng. vd: gửi gạch đi phú quốc
        diadiembochang:req.body.diadiembochang,  // Địa chỉ bọc hàng
        hinhthucthanhtoan:req.body.hinhthucthanhtoan, // ghi no => 1, truc tiep => 2, thanh toan khi nhan hang => 3 
        ghichu: req.body.ghichu, // ghi chú đơn hàng
        trangthai: req.body.trangthai // 0 lưu dự định nhập. 1 hoàn thành việc nhập. 2, khóa chuyến hàng
    });
    newPnh.save(async function(e){
        if(e) {
            return res.status(200).send(new Response(1001,"lưu không thành công ", null));
        } else {
            return res.status(200).send(new Response(0,"lưu thành công ", newPnh));
        }
    })
}
