const db = require("../model");
const dbCon = require('../common/DBConnect');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require("lodash")
const Const = require('../common/const');

let menus = require('../common/menu');
let commonfun = require('../common/functionCommon');
let Responses = require('../common/response');
let Response = Responses.Response;
let DataResponse = Responses.DataResponse;
const User = db.user;
const Role = db.role;
const Menu = db.menu;
const { registerValidator } = require('./../validations/auth');

// process
const UserChangePasswordProcess = require("../process/userProcess/userChangePasswordProcess");
const UserAddSmartDetailProcess = require("../process/userProcess/userAddSmartDetailProcess");
exports.demo = async (req,res) => {
    console.log(req.body);

}

exports.changePassword = async (req,res) => {
    try {
        const userChangePasswordProcess = new UserChangePasswordProcess(dbCon.dbDemo);
        await userChangePasswordProcess.start();
        const session = userChangePasswordProcess.transaction;
        let data = await userChangePasswordProcess.changePassword(req.body,session);
        await userChangePasswordProcess.commit();
        return res.status(200).send(new Response(0,"data success!", data));
    } catch (error) {
        return res.status(200).send(new Response(1001,"Lỗi hệ thống!", null));
    }
}

exports.checkEmail = async (req,res) => {
    let checkEmail = await User.findOne({email: req.body.email});
    if(checkEmail) return res.status(200).send(new Response(0,"Email tồn tại !", checkEmail));
    return res.status(200).send(new Response(0,"email chưa có ai đăng ký !", null));
}

exports.checkName = async (req,res) => {
    let checkName = await User.findOne({name: req.body.name});
    if(checkName) return res.status(200).send(new Response(0,"name tồn tại !", checkName));
    return res.status(200).send(new Response(0,"name chưa có ai đăng ký !", null));
}

exports.addDetailUser= async(req,res) =>{
    let dataNow = _.now()
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let newUser = new User({
        name: req.body.name,
        available: req.body.available,
        sex: req.body.sex,
        email: req.body.email,
        dienthoai: req.body.dienthoai,
        zalo: req.body.zalo,
        password:hashPassword,
        role_id: req.body.role_id,
        account_id: [],
        menulist: [],
        phongban_id: req.body.phongban_id,
        lastLoginTime:dataNow
        
    });
    newUser.save(async function(e){
        if(e){
            return res.status(501).send(new Response(1001,"Error save User !", null));
        }else {
            return res.status(200).send(new Response(0,"user save sucess !", newUser));
        }
    })
}

exports.addSmartDetailUser = async (req , res) => {
   try {
       const userAddSmartDetailProcess = new UserAddSmartDetailProcess(dbCon.dbDemo);
       await userAddSmartDetailProcess.start();
       const session = userAddSmartDetailProcess.transaction;
       let response = await userAddSmartDetailProcess.addSmartDetail(req.body,session);
       await userAddSmartDetailProcess.commit();
       return res.status(200).send(new Response(0,"data success!", response));
   } catch (error) {
       return res.status(200).send(new Response(1001,"Lỗi hệ thống!", null));
   }
}

exports.getAllUser = async (req,res) => {
    let allData = await User.find(req.body.filters);
    if(req.body.pageNum == 0 && req.body.pageSize ==0) {
        res.status(200).send(new Response(0,"data sucess",allData));
    } else {
        let n = req.body.pageNum - 1;
        let lst = await User.find(req.body.filters).limit(req.body.pageSize).skip(req.body.pageSize*n);
        let data = commonfun.dataReponse(allData,lst,req.body.pageNum,req.body.pageSize);
        res.status(200).send(new Response(0,"data sucess",data));
    }
}

exports.getDetailUser = async(req,res) => {
    let id = req.params.id;
    let user = await User.findOne({_id:id});
    if(!user) return res.status(500).send(new Response(1001,"User không tồn tại !",null));
    return res.status(200).send(new Response(0,"Data sucess ", user));
}

exports.editDetailUser =async (req,res) => {
    User.updateOne(
    {_id: req.body.id},
    {
        $set: {
            name: req.body.name,
            sex: req.body.sex,
            available: req.body.available,
            zalo: req.body.zalo,
            dienthoai: req.body.dienthoai,
            email: req.body.email,
            role_id: req.body.role_id,
            phongban_id: req.body.phongban_id
        }
    })
    .then(data => {
        if(data.modifiedCount == 1) {
            res.status(200).send(new Response(0,"update sucess data",data));
        }
    },err => {
        res.status(400).send(new Response(1001,"Error update User",null));
    })
}


exports.register =  async(req,res)=>{
    const { error } = registerValidator(req.body);
    if (error){
        let response = new Response(1010,error.details[0].message,null);
        return res.status(423).send(response);
    } 
    const checkEmailExist = await User.findOne({ email: req.body.email });
    if (checkEmailExist) {
        let response = new Response(1010,'Email is exist',null);
        return res.status(422).send(response);
    } 
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let role = "";
    if(req.body.email == "devadmin@gmail.com") {
        role = await Role.findOne({rolename: "Dev"});
    }else {
        role = await Role.findOne({rolename: "User"});
    }
    console.log(role._id)
    if (!role) {
        let response = new Response(1010,'Role is exist',null);
        return res.status(422).send(response);
    } 

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        role:[],
        account_id:[]
    });

    try {
        const newUser = await user.save();
        await User.updateOne({email:newUser.email},{$push:{role_id:role._id}});
        await res.send(newUser);
    } catch (err) {
        res.status(400).send(err);
    }
}

// login 
exports.login =  async (req,res) => {
    if (req.body.mode && req.body.mode == 'mobile') {
       await this.loginMobile(req,res);
       return;
    }
    const user = await User.findOne({email: req.body.email}).populate("role_id");
    if (!user) {
        let response = new Response(1010,'Email chưa đăng ký !',null);
        return res.status(200).send(response);
    } 
    if(Const.idTaixe == user.phongban_id) {
        let response = new Response(1010,'Vui lòng chọn Đăng nhập Tài Xế !',null);
        return res.status(200).send(response);
    }

    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword){
        let response = new Response(1010,'Password không đúng !',null);
        return res.status(200).send(response);
    } 

    let arraycode = "";
    let num =0;
    //console.log(user.role_id)
    if(user.role_id.length == 1){
        let idRole = user.role_id[0]._id
        let role = await Role.findOne({_id:idRole}).populate("dacquyen");
        role.dacquyen.forEach(function(m){
            if(num > 0){
                arraycode = arraycode + ","
            }
            arraycode = arraycode + m.code;
            num ++;
        })
    }else {
        let pemiss = [];
        for(let element of user.role_id) {
            let i = 0;
            let idRole = element._id;
            let role = await Role.findOne({_id: idRole}).populate("dacquyen");
            let check = false;
            for (let e of pemiss) {
                if (e._id == role.dacquyen[i]._id) {
                    check = true;
                }
            }
            if (check === false) {
                pemiss.push(role.dacquyen[i]);
            }
            i ++
        }
        pemiss.forEach(function(m){
            if (num > 0) {
                arraycode = arraycode + ","
            }
            arraycode = arraycode + m.code;
            num ++;
        })
    }
    
    const token = await jwt.sign({userId: user._id, rol: arraycode, username: user.name, email: user.email}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });
    return res.status(200).send(new Response(0,'Login successfully !',token));
}

exports.loginMobile = async (req, res) => {
    let reqemail = req.body.email;
    let reqpass = req.body.password;
    const user = await User.findOne({email: reqemail}).populate("role_id");
    if (!user) {
        let response = new Response(1010,'Email chưa đăng ký !',null);
        return res.status(200).send(response);
    }

    if (Const.idTaixe != user.phongban_id) {
        let response = new Response(1010,'người dùng không là Tài xế !',null);
        return res.status(200).send(response);
    }

    const checkPassword = await bcrypt.compare(reqpass, user.password);
    if (!checkPassword){
        let response = new Response(1010,'Password không đúng !',null);
        return res.status(200).send(response);
    } 
    let arraycode = "1,2,3";
    const token = await jwt.sign({userId: user._id, rol: arraycode, username: user.name, email: user.email, idPhongban: user.phongban_id}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });
    return res.status(200).send(new Response(0,'Login Tài xế successfully !',token));
}

exports.getRoles = async(req, res) => {
   let listRole = await Role.find({});
   if(listRole.length == 0) {
     let response = new Response(1010, "Role chưa được khởi tạo !", null)
     return res.status(422).send(response);
   }
   let response = new Response(0, "Data sucess !", listRole)
   return res.status(200).send(response);
}

exports.getMenu = async(req, res) => {
    let user = await User.findOne({_id: req.userID}).populate("role_id");
    if(!user) return res.status(400).send(new Response(1000,"Bạn không có quyền truy cập vào Module này", null));
    if(user.role_id.length == 1){
        let idRole = user.role_id[0]._id
        let role = await Role.findOne({_id:idRole}).populate("dacquyen");
        let data = {
            "total": role.dacquyen.length,
            "list" : role.dacquyen
        }
        return res.status(200).send(new Response(0,"Data sucess ",role.dacquyen));
    }else {
        let pemiss = [];
        for(let element of user.role_id) {
            let i = 0;
            let idRole = element._id;
            let role = await Role.findOne({_id: idRole}).populate("dacquyen");
            if(pemiss.length == 0) {
               pemiss.push(role.dacquyen[i]);
            }else {
              let check = false;
               for(let e of pemiss) {
                   if(e._id == role.dacquyen[i]._id) {
                       check = true;
                   }
               }
               if(check === false) {
                pemiss.push(role.dacquyen[i]);
               }
            }
            i ++
        }
        let data = {
            "total": pemiss.length,
            "list" : pemiss
        }
        return res.status(200).send(new Response(0,"Data sucess ",pemiss));
    }
}


// login - app
exports.loginApp = async (req,res) => {
    if(req.body.mode != "app") {
        let response = new Response(1010,'người dùng không hợp lệ !',null);
        return res.status(200).send(response);
    }
    const user = await User.findOne({email: req.body.email}).populate("role_id");
    if (!user) {
        let response = new Response(1010,'Email chưa đăng ký !',null);
        return res.status(200).send(response);
    } 
    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword){
        let response = new Response(1010,'Password không đúng !',null);
        return res.status(200).send(response);
    } 
    
    if(user.phongban_id != Const.idTaixe) {
        let response = new Response(1010,'người dùng không hơp lệ !',null);
        return res.status(200).send(response);
    }
    //console.log(user.role_id)
    const token = await jwt.sign({userId: user._id, idPhongban: user.phongban_id, username: user.name, email: user.email}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });
    return res.status(200).send(new Response(0,'Login successfully !',token));
}


