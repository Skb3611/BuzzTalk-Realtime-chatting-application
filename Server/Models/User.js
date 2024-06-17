const mongoose =require('mongoose')
const {Schema} =require('mongoose')
const UserModel = new Schema({
    username:{
        type:String,
        unique:true,
        min:3,
        max:15,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    is_profile_set:{
        type:Boolean,
        default:false
    },
    profileImg:{
        type:String,
        default:""
    }


  },{timestamps:true});

module.exports=mongoose.model("User",UserModel)