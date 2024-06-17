const express = require('express')
const app = express()
const cors=require('cors')
const { default: mongoose } = require('mongoose')
const { Server } = require('socket.io');
require('dotenv').config()
app.use(cors())
app.use(express.json())
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use("/api/auth",require('./Routes/auth'))
mongoose.connect(process.env.MONGO_URL).then(("connected")).catch(er=>{(er)})
app.use('/',require('./Routes/Message'))

const server=app.listen(process.env.PORT, () => {
  (`Example app listening on port ${process.env.PORT}`)
})

const io = new Server(server,{
  cors:{
    origin:"https://buzz-talk-realtime-chatting-application.vercel.app",
    credentials: true
  }
}); 
let users={}
io.on('connection',(socket)=>{
    socket.on("new-user",(id)=>{
      let isNewUser = true;
      for (const socketId in users) {
        // (socketId,id)
          if (users[socketId] === JSON.stringify(id)) {
              isNewUser = false;
              break;
          }
      }
      if (isNewUser) {
        users[socket.id] = id;
    }
    (users)
    })
  socket.on("send",({message,sender,receiver})=>{
    (message,sender,receiver)
    let senderid,receiverid;
    for (const socketId in users) {
    if(users[socketId]==sender){senderid=socketId}    
    if(users[socketId]==receiver){receiverid=socketId}    
      }
      (senderid,receiverid)
    
    // socket.emit('reveive',{message,sender,receiver})
    if (receiverid) {
      socket.to(receiverid).emit('receive', { message, sender, receiver });
    } else {
      ("Receiver not connected");
    }
  })
})
