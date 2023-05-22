const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Screenpc = db.screenpc;


exports.getAllDataSC = async (req,res) => {
    let n = req.body.pageNum - 1;
    let allData = await Screenpc.find(req.body.filters);
    let lst = await Screenpc.find(req.body.filters).limit(req.body.pageSize).skip(req.body.pageSize*n);
    let data = commonfun.dataReponse(allData,lst,req.body.pageNum,req.body.pageSize);
    return res.status(200).send(new Response(0, "data sucess",data));
}

exports.addListDatasc = async (req,res) => {
    let lst = req.body.list;
    for(let element of lst) {
        let newSceen =new Screenpc({
            idmenu:element.idmenu,
            lang:element.lang,
            title1: element.title1,
            title2: element.title2 == null? "" : element.title2,
            vitri: element.vitri,
            status: element.status
        })
        await newSceen.save();
    }
    res.status(200).send(new Response(0, "data sucess",1));
}

exports.getDetailDataSC = async (req,res) => {
    let dataSc = await Screenpc.findOne({_id:req.body.id});
    if(dataSc) {
        return res.status(200).send(new Response(0,"Data sucess ", dataSc));
    } else {
        return res.status(200).send(new Response(0,"Data Null ", null));
    }
}

exports.updateDataSC = async (req,res) => {
    Screenpc.updateOne({_id:req.body.id},{$set: 
        {
            title1: req.body.title1,
            title2: req.body.title2, 
            vitri: req.body.vitri, 
            lang: req.body.lang, 
            status:req.body.status
        }
    })
    .then(data => {
        return res.status(200).send(new Response(0,"Data sucess ", data.modifiedCount));
    },err => {
        return res.status(200).send(new Response(0,"Error ",null));
    })

}