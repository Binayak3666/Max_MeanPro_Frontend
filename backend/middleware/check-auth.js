const jwt = require("jsonwebtoken")
// middleware auth token verify for backend
module.exports = (req, res, next)=>{
  try{
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY)
    req.userData = {email: decodedToken.email, userId: decodedToken.userID}
    next();
  }catch{
    res.status(401).json({
      message: "You are not authonticated !"
    })
  }
}
