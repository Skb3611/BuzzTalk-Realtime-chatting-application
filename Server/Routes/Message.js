const express=require('express')
const router=express.Router()
const MessageModel=require('../Models/MessageModel')

router.post('/addmsg',async(req,res)=>{
    try {
        let {message,sender,receiver}=req.body
        let msg= await MessageModel.create({
            message:message,
            sender:sender,
            receiver:receiver
        })
        return res.status(200).send('Msg Added')

    } catch (e) {
        return res.status(500).send('Internal server error')
    }
})
router.post('/getallmsg',async(req,res)=>{
    try {
        let {sender,receiver}=req.body;
        let msgs= await MessageModel.find({sender:{$in:[sender,receiver]},receiver:{$in:[receiver,sender]}}).sort({updatedAt:1}) 
        return res.status(200).json(msgs)
    } catch (error) {
        return res.status(500).send('Internal server error')
    }
})
module.exports= router
