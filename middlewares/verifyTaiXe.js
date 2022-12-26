const jwt = require('jsonwebtoken');
const Const = require('../common/const');
module.exports = (request, response, next) => {
    let tokenreq =request.headers.authorization;
    tokenreq = tokenreq.substring(7);
    
    const token = tokenreq;
    if (!token) return response.status(401).send({message: 'Access Denied'});

    try {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if(err){
                response.status(401).send({message: 'Access Denied'});
            } else {
                request.userID = decoded.userId;
                let role = decoded.role;
                let idphongban = decoded.idPhongban;
                let checkRoleTaiXe = false;
                if(idphongban == Const.idTaixe) {
                    checkRoleTaiXe = true;
                }
                if(checkRoleTaiXe === true) {
                    next();
                }else {
                    response.status(401).send({message: 'Not Access Role !'});
                }
            }
        });
    } catch (err) {
        return response.status(400).send({message: 'Invalid Token'});
    }
};