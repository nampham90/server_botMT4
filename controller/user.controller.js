const db = require("../model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let Responses = require('../common/response');
let Response = Responses.Response;
const User = db.user;
const Role = db.role;
const { registerValidator } = require('./../validations/auth');

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

exports.login =  async(req,res)=>{
    let listRole = [];
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        let response = new Response(1010,'Email chưa đăng ký !',null);
        return res.status(422).send(response);
    } 
    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    console.log(checkPassword);
    if (!checkPassword){
        let response = new Response(1010,'Password không đúng !',null);
        return res.status(422).send(response);
    } 
   
    for(const element of user.role_id){
        const role = await Role.findOne({_id: element});
        listRole = listRole.concat(role.rolename);
    }
    
    const token = await jwt.sign({_id: user._id, role: listRole}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });
    const data = {
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: listRole
        }
    }
    let response = new Response(0,'Login successfully !',data);
    return res.status(200).send(response);
}

exports.getRoles = async(req, res) => {
   let listRole = await Role.find({});
   if(listRole.length == 0) { return res.status(422).send({message: 'Role chưa được khởi tạo !'});}
   return res.status(200).send({listRole});
}