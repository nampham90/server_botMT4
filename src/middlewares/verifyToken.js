const jwt = require('jsonwebtoken');
let Responses = require('../common/response');
let Response = Responses.Response;

module.exports = (request, response, next) => {
    let tokenreq =request.headers.authorization;
    let lang = request.headers['accept-language'];
    tokenreq = tokenreq.substring(7);
    
    const token = tokenreq;
    if (!token) return response.status(200).send(new Response(1010,"Error Token ", null));

    try {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if(err){
                //console.log(err);
                
                response.status(200).send(new Response(1012,"Hết hạn đăng nhặp ", null));
            } else {
                request.userID = decoded.userId;
                request.lang = lang;
                request.isLoggedIn = true;
                let role = decoded.role;
                next();
            }
        });
    } catch (err) {
        return response.status(200).send(new Response(1010,"Error Token ", null));
    }
};