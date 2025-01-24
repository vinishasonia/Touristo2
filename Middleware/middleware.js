const jwt= require('jsonwebtoken');
const key="Hello";

const fetchAdmin =(req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.send('token not found')
    }
    try{
        const data=jwt.verify(token,key);
        req.user=data
        next()
    }
    catch(err){
        console.log(err)
    }
}
module.exports=fetchAdmin;