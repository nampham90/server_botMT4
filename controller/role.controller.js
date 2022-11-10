const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Role = db.role;


exports.getListRole = async(req,res) => {
    let n = req.body.pageNum - 1;
    let alldata = await Role.find(req.body.filters);
    let lst = await Role.find(req.body.filters).limit(req.body.pageSize).skip(req.body.pageSize*n);
    let data = commonfun.dataReponse(alldata,lst,req.body.pageNum,req.body.pageSize);
    return res.status(200).send(new Response(0,"Data sucess", data));
}

exports.getSearchAllRole = async(req,res) => {
    let lst = await Role.find({});
    return res.status(200).send(new Response(0,"Data sucess", lst));
}

exports.GetDetailRole = async (req,res)=>{
    let id = req.params.id;
    
    let role = await Role.findOne({_id: id});
    if(role) {
        return res.status(200).send(new Response(0,"Data sucess", role));
    }else {
        let newRole = new Role({
            rolename: req.body.rolename,
            mota: req.body.mota,
            dacquyen: []
        });
    }
}

exports.AddDetailRole = async (req,res)=>{
    console.log(req.body);
    let checkRole = await Role.findOne({rolename: req.body.rolename});
    if(checkRole) {
        return res.status(500).send(new Response(1001,"Role đã tồn tại !", null));
    } else {


    }

}

exports.EditDetailRole = async (req,res)=>{
    
}

exports.DelDetailRole = async (req,res)=>{
    
}

exports.GetpermissionRole = async (req,res)=>{
    let id = req.params.id;
    let role = await Role.findOne({_id: id}).populate("dacquyen");
    let list = [];
    for(let element of role.dacquyen){
        list.push(element.code);
    }
    if(role) {
        return res.status(200).send(new Response(0,"Data sucess", list));
    }else {
        return res.status(500).send(new Response(1001,"Data null", null));
    }
}

exports.PutpermissionRole = async (req,res)=>{
    let updatePermission = await Role.updateOne({_id: req.body.roleId},{$set: {dacquyen:req.body.permissionIds}});
    if(updatePermission.modifiedCount == 1) {
        res.status(200).send(new Response(0, "update thang cong ",1));
    }else {
        res.status(500).send(new Response(1001, "not update data ",null));
    }
    
}

