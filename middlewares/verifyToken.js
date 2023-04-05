const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    let tokenreq =request.headers.authorization;
    tokenreq = tokenreq.substring(7);
    
    const token = tokenreq;
    if (!token) return response.status(401).send({message: 'Access Denied'});

    try {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if(err){
                //console.log(err);
                response.status(401).send({message: 'Access Denied'});
            } else {
                request.userID = decoded.userId;
                request.isLoggedIn = true;
                let role = decoded.role;
                next();
            }
        });
    } catch (err) {
        return response.status(400).send({message: 'Invalid Token'});
    }
};