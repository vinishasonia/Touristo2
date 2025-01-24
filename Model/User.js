//step1:importing
const mongoose=require('mongoose')

//step2:creating schema
const UserSchema=new mongoose.Schema(
    {
        email:{
            type:String,
        },
        username:{
            type:String,
        },
        password:{
            type:String,
        },
        phone:{
            type:Number,
        },
        address:{
            type:String,
        }
    }
)
//step3: exporting and creating model
module.exports=mongoose.model("User",UserSchema)