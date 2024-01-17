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
    const verified = jwt.verify(token, process.env.SECRET);
    if (verified) {
        return verified.data;
    }
    return null;
}

module.exports = {
    registerValidator,
    encrypt,
    decrypt
};