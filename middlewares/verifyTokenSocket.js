const jwt = require("jsonwebtoken");

module.exports  = (socket, next) => {
  // since you are sending the token with the query
  const token = socket.handshake.auth.token;
  try {
    jwt.verify(token, process.env.TOKEN_SECRET, (err,decoded) => {
       if(err) {
           return next(new Error("NOT AUTHORIZED"));
       } else {
          socket.userID = decoded.userId;
          next();
       }
    });
  } catch (err) {
    return next(new Error("NOT AUTHORIZED"));
  }
};
