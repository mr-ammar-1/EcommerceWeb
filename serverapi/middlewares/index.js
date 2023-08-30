// import expressjwt from "express-jwt";

// export const requireLogin = expressjwt({
//       getToken: (req, res) => req.cookies.token,
      
//       secret: process.env.JWT_SECRET_KEY,
//       algorithms: ["HS256"],
// });



const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
       //let token = null;
       /* get token from header "react - userend axiosInstance" */
       
       //token = req.headers.authorization.split(" ")[1];
       const token = req.header("authorization").split(" ")[1];
       console.log(token);
       const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
       console.log('current user',decryptedToken);
       req.user._id = decryptedToken.user._id;
       next();
    } catch(error) {
        // if(error.name === "JsonWebTokenError"){
        //     return next(createError.Unauthorized())
        // }
        res.send({
            success: false,
            message: 'Unathurized token'
        });
    }
};