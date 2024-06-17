const mongoose =require('mongoose')
const {Schema} =require('mongoose')
const MessageModel= new Schema({
    message:{type:String,required:true},
    sender:{type:String, required: true},
    receiver:{type:String, required: true}
},{timestamps:true})

module.exports=mongoose.model("MessageModel",MessageModel)
