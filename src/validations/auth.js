const Joi = require('joi');
const jwt = require('jsonwebtoken');

const registerValidator = (data) => {
    const rule = Joi.object({
        name: Joi.string().min(6).max(225).required(),
        email: Joi.string().min(6).max(225).required().email(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
    })

    return rule.validate(data);
}

const encrypt = (string) => {
    // Tạo một payload chứa chuỗi string
    const payload = { data: string };
    // Tạo một token bằng cách mã hóa payload với chuỗi bí mật
    const token = jwt.sign(payload, process.env.SECRET)
    return token;
}

const decrypt = (token) => {
    try {
        const verified = jwt.verify(token, process.env.SECRET);
        return verified.data;
    } catch (error) {
        return null;
    }
}


const mergeUser = (user) => {
    const muser = {
        id: user.id,
        name: user.name,
        available: user.available,
        sex: user.sex,
        dienthoai: decrypt(user.dienthoai) == null? user.dienthoai : decrypt(user.dienthoai),
        email: decrypt(user.email) == null? user.email : decrypt(user.email),
        phongban_id: user.phongban_id,
        BUYERNMENC: decrypt(user.BUYERNMENC) == null? user.BUYERNMENC : decrypt(user.BUYERNMENC),
        BUYERADRS1ENC: decrypt(user.BUYERADRS1ENC) == null? user.BUYERADRS1ENC : decrypt(user.BUYERADRS1ENC),
        BUYERADRS2ENC: decrypt(user.BUYERADRS2ENC) == null? user.BUYERADRS2ENC : decrypt(user.BUYERADRS2ENC),
        BUYERADRS3ENC: decrypt(user.BUYERADRS3ENC) == null? user.BUYERADRS3ENC : decrypt(user.BUYERADRS3ENC),
        taxcd: decrypt(user.taxcd) == null? user.taxcd :  decrypt(user.taxcd),
        desc: user.desc,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
        sysDepartmentId: user.sysDepartmentId
    }

    return muser;
}

const mergeListUser = (listuser) => {
    let newListUser = [];
    for(let item of listuser) {
        const muser = {
            id: item.id,
            name: item.name,
            available: item.available,
            sex: item.sex,
            dienthoai: decrypt(item.dienthoai) == null? item.dienthoai : decrypt(item.dienthoai),
            email: decrypt(item.email) == null? item.email : decrypt(item.email),
            phongban_id: item.phongban_id,
            BUYERNMENC: decrypt(item.BUYERNMENC) == null? item.BUYERNMENC : decrypt(item.BUYERNMENC),
            BUYERADRS1ENC: decrypt(item.BUYERADRS1ENC) == null? item.BUYERADRS1ENC : decrypt(item.BUYERADRS1ENC),
            BUYERADRS2ENC: decrypt(item.BUYERADRS2ENC) == null? item.BUYERADRS2ENC : decrypt(item.BUYERADRS2ENC),
            BUYERADRS3ENC: decrypt(item.BUYERADRS3ENC) == null? item.BUYERADRS3ENC : decrypt(item.BUYERADRS3ENC),
            taxcd: decrypt(item.taxcd) == null? item.taxcd :  decrypt(item.taxcd),
            desc: item.desc,
            updatedAt: item.updatedAt,
            createdAt: item.createdAt,
            sysDepartmentId: item.sysDepartmentId
        }
        newListUser.push(muser);
    }
    return newListUser
}

module.exports = {
    registerValidator,
    encrypt,
    decrypt,
    mergeUser,
    mergeListUser
};