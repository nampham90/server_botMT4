const db = require("../model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = db.user;
const Role = db.role;
const { registerValidator } = require('./../validations/auth');

exports.register =  async(req,res)=>{
    const { error } = registerValidator(req.body);
    console.log(req.body);
    if (error) return res.status(423).send({message:error.details[0].message});
    const checkEmailExist = await User.findOne({ email: req.body.email });
    if (checkEmailExist) return res.status(422).send({message:'Email is exist'});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let role = "";
    if(req.body.email == "devadmin@gmail.com") {
        role = await Role.findOne({rolename: "Dev"});
    }else {
        role = await Role.findOne({rolename: "User"});
    }
    console.log(role._id)
    if (!role) return res.status(422).send({message:'Role is exist'});

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

    if (!user) return res.status(422).send({message: 'Email or Password is not correct'});
    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword) return res.status(422).send({message: 'Email or Password is not correct'});
   
    for(const element of user.role_id){
        const role = await Role.findOne({_id: element});
        listRole = listRole.concat(role.rolename);
    }
    
    const token = await jwt.sign({_id: user._id, role: listRole}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });
    return res.status(200).send({
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: listRole
        },
        message: 'Login successfully'
    });
}

exports.getRoles = async(req, res) => {
   let listRole = await Role.find({});
   if(listRole.length == 0) { return res.status(422).send({message: 'Role chưa được khởi tạo !'});}
   return res.status(200).send({listRole});
}