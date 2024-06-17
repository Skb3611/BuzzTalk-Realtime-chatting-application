import React, { useState, useEffect, useRef } from 'react'
import { IoMdSend } from "react-icons/io";
import { FaSmileWink } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import { getallmsg, addmsg } from '../Api/api';
import { v4 as uuidv4 } from 'uuid';
import '../scrollbar.css'
import logo from '../assets/logo.png'



const Chat_container = ({ currentuser, receiver, socket,handleReceiver }) => {
  const [message, setMessage] = useState("")
  const [bool, setBool] = useState(false)
  const [messages, setMessages] = useState([])
  const [IncomingMsg, setIncomingMsg] = useState()
  const scrollRef = useRef();

  useEffect(() => {
    (async function () {
      let data = { sender: currentuser.id, receiver: receiver._id }
      let msgs = await axios.post(getallmsg, data)
      setMessages(msgs.data)
    }())
  }, [receiver])

  const handlechange = (e) => {
    setMessage(e.target.value)
  }
  const picker = () => {
    setBool(!bool)
  }
  const emojiclick = (emoji) => {
    let msg = message
    msg += emoji.emoji
    setMessage(msg)
  }
  const handlesend = async (msg) => {
    if(bool)setBool(false)
    let data = {
      message: msg,
      sender: currentuser.id,
      receiver: receiver._id
    }
    // (data)
    socket.current.emit('send', data)
    let res = await axios.post(addmsg, data)
    setMessages([...messages, data])
    setMessage('')
  }
  useEffect(() => {
    if (socket.current) {
      const handleReceiver = ({ message, sender, receiver }) => {
        if (message && sender && receiver) {
          setIncomingMsg({ message, sender, receiver });
        }
      };
      socket.current.on('receive', handleReceiver);

      return () => {
        socket.current.off('receive', handleReceiver);
      };
    }
  }, [socket])

  useEffect(() => {
    (IncomingMsg)
    if (IncomingMsg)
      setMessages((messages) => [...messages, IncomingMsg]);
  }, [IncomingMsg])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior:"smooth"});
  }, [messages])





  return (
    <div className='h-full w-full p-2'>
      <div className="container h-[90%] ">
        <div className="name">
          <div className="flex items-center bg-black gap-4 p-2 rounded-md">
          <IoIosArrowBack className='text-2xl cursor-pointer' onClick={()=>{handleReceiver(null)}} />
            <img width={50} src={`data:image/svg+xml;base64, ${receiver.profileImg}`} alt="" />
            <span className='font-semibold text-lg'>{receiver.username}</span>
          </div>
        </div>
        <div className="chats py-2 px-5 h-[85%] flex flex-col gap-2 overflow-y-auto scrollable-container">
          {messages.length <= 0?
          <div className='h-full w-full flex justify-center items-center flex-col'>
                <img width={200} height={200} src={logo} alt="" />
            <span className='text-2xl'>No messages yet</span>
          </div> :
            messages.map((item) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  {currentuser.id === item.receiver ?
                    <div className="receive flex gap-2  justify-start">
                      <img width={40} src={`data:image/svg+xml;base64, ${receiver.profileImg}`} alt="" />
                      <span className='bg-black text-sm md:text-base py-2 px-4 rounded-xl max-w-[70%]'>{item.message}</span>
                    </div>
                    :
                    <div className="send flex gap-2  justify-end ">
                      <span className='bg-black text-sm md:text-base py-2 px-4 rounded-xl max-w-[70%]'>{item.message}</span>
                      <img width={40} src={`data:image/svg+xml;base64, ${currentuser.profileImg}`} alt="" />
                    </div>
                  }
                </div>
              )
          })
        }
      </div>
        <div className="inputs flex gap-2 h-[10%] sm:justify-between items-center sm:p-3">
          <div className="emoji-picker text-2xl relative w-[5%] h-full mt-5 sm:m-0">
            <FaSmileWink onClick={picker} className='cursor-pointer' />
            {
              bool && <EmojiPicker open={bool} theme='dark' className='absolute -top-[400px]' style={{ height: "350px", width: "250px" }} onEmojiClick={(emoji) => emojiclick(emoji)} />
            }

          </div>

          <div className="input w-[90%]">
            <input onChange={handlechange} value={message} className='w-full text-lg px-3 py-1 border-2 border-purple-500 bg-transparent rounded-lg ' type="text" name="message" id="message" placeholder='Message' />
          </div>

          <button type="button" className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center" onClick={() => handlesend(message)} ><IoMdSend /></button>

        </div>
      </div>
    </div>  )
}

      export default Chat_container
