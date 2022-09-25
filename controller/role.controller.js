const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Role = db.role;


exports.getListRole = async(req,res) => {
    console.log(req.body);
    let lst = await Role.find(req.body.filters);
    let data = commonfun.dataReponse(lst,req.body.pageNum,req.body.pageSize);
    return res.status(200).send(new Response(0,"Data sucess", data));
}

exports.GetDetailRole = async (req,res)=>{
    console.log(req.params.id);
}

exports.AddDetailRole = async (req,res)=>{
    
}

exports.EditDetailRole = async (req,res)=>{
    
}

exports.DelDetailRole = async (req,res)=>{
    
}

exports.GetpermissionRole = async (req,res)=>{
    
}

exports.PutpermissionRole = async (req,res)=>{
    
}

