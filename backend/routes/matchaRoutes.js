const jwt = require("jsonwebtoken");

function auth(req,res,next){

const token = req.headers.authorization;

if(!token){
return res.status(401).json({message:"No token"});
}

try{

const decoded = jwt.verify(token,"secret");

req.userId = decoded.id;

next();

}catch(err){
res.status(401).json({message:"Invalid token"});
}

}

module.exports = auth;