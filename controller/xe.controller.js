const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Xe = db.xe;


exports.PostAllXe = async (req,res) => {
    let n = req.body.pageNum - 1;
    let alldata = await Xe.find(req.body.filters);
    let lst = await Xe.find(req.body.filters).limit(req.body.pageSize).skip(req.body.pageSize*n);
    let data = commonfun.dataReponse(alldata,lst,req.body.pageNum,req.body.pageSize);
    return res.status(200).send(new Response(0,"Data sucess", data));
}
//https://xekinhdoanh24h.com/wp-content/uploads/2021/11/cropped-shipping-icon.png
exports.CreateXe = async (req,res) => {
    console.log(req.body)
    let image = "https://xekinhdoanh24h.com/wp-content/uploads/2021/11/cropped-shipping-icon.png";
    let newXe = new Xe({
        biensoxe: req.body.biensoxe,
        anhdaidien: image,
        tenxegoinho: req.body.tenxegoinho,
        trongtai: req.body.trongtai,
        trangthai: false
    });

    newXe.save(async function(e){
        if(e){
            res.status(500).send(new Response(1001,"Lỗi khi khởi tạo Xe !", null));
        }else {
            res.status(200).send(new Response(0,"Create Sucess !", newXe));
        }
    })
}

exports.getDetail = async (req,res) => {
    console.log(req.params.id);
    let id = req.params.id;
    let x = await Xe.findOne({_id:id});
    if(x){
        res.status(200).send(new Response(0,"Data Sucess", x));
    }else {
        res.status(500).send(new Response(1000, "Data Null", null));
    }
}

