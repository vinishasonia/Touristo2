const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken');
const AdminSchema = require('../../Model/Admin');
const key="Hello"

const AdminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await AdminSchema.findOne({email})
        if (!user) {
             return res.json({success:false,message:'Invalid credentials'})            
        } else {
            const ismatch=await bcrypt.compare(password,user.password)
            if(!ismatch){
               return res.json({success:false,message:'Incorrect email or password'})
            }else{
                const data=user.id
                const token=await jwt.sign(data,key)
                res.json({success:true,message:'Login Successfull..',token})
            }
        }
    }
    catch(err){
        console.log(err)
    }
}
module.exports={AdminLogin}