const jwt = require('jsonwebtoken');

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

                let role = decoded.role;
                let checkRoleAdmin = false;
                role.forEach(element => {
                    if(element == "Dev"){
                        checkRoleAdmin = true;
                    }
                });
                if(checkRoleAdmin === true) {
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