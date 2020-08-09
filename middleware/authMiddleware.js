const jwt = require('jsonwebtoken');
let isAuth = async (req, res, next) => {
  const tokenServer = "HS256";
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
    try {
      const decoded = await jwt.verify(token, tokenServer);
      if(decoded){
        req.jwtDecoded = decoded;
        console.log(req.session.user);
        next();
      }else{
          console.log('errr');
      }
      
    } catch (error) {
      return res.json({
        nessages: "Không thể thực hiện yêu cầu",
      });
    }
  } else {
    return res.json({
      nessages: "authorization",
    });
  }
};
module.exports = {
  isAuth,
};
