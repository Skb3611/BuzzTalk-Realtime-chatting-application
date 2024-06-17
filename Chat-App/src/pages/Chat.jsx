import React, { useState, useEffect, useRef } from 'react'
import '../scrollbar.css'
import Chatlist from '../components/Chatlist'
import Chat_container from '../components/Chat_container'
import logo from '../assets/logo.png'
import loader from '../assets/loader.gif'
import { json, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getusers, host } from '../Api/api'
import Navbar from '../components/Navbar'
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef()
  const [currentuser, setCurrentuser] = useState(null)
  const [receiver, setReceiver] = useState(null)
  const [Users, setUsers] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('chat-app-user'))
      navigate('/')
    else if (!(JSON.parse(localStorage.getItem('chat-app-user')).is_profile_set)) {
      navigate('/setProfile')
    }
  }, [])
  useEffect(() => {
    let setuser = async () => {
      let user = await JSON.parse(localStorage.getItem('chat-app-user'))
      setCurrentuser(user)
    }
    setuser();
  }, [])
  useEffect(() => {
    if (currentuser) {
      socket.current = io(host)

      socket.current.emit("new-user", currentuser.id)
    }
  }, [currentuser])

  useEffect(() => {
    (async function () {
      if (currentuser) {
        // console.log(currentuser)
        let users = await axios.get(`${getusers}/:${currentuser.id}`)
        // console.log(users)
        setUsers(users.data.users)
      }
    }())
  }, [currentuser])
  const handleReceiver = (user) => {
    setReceiver(user)
  }
  const checkreceiver = (user) => {
    if (receiver == user)
      return true
    else return false
  }


  return (
    <>
      <div className="-z-10 absolute h-screen w-full bg-slate-950"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] overflow-hidden"></div></div>
      <Navbar />
      {(currentuser == null && Users.length == 0) ? <>
        <div className='h-screen w-screen flex justify-center items-center'>
          <img src={loader} alt="" />
        </div>
      </> : <section className="flex items-center justify-center h-full">
        <div className="bg absolute -z-10 w-full sm:w-[95vw] lg:w-[80vw] h-[85vh] bg-white border-2 border-purple-400 rounded-2xl opacity-0 sm:opacity-[0.04]">
        </div>
        <div className="m-2 bg w-full sm:w-[95vw] lg:w-[80vw] h-[85vh] bg-transparent border-2 rounded-xl flex">
          <div className={`left h-full w-full sm:w-[40%] lg:w-[30%] p-2 sm:block ${receiver?'hidden':'block'}`}>
            <div className="user">
              <div className="item flex items-center bg-black gap-4 p-3 rounded-md">
                <img width={50} src={`data:image/svg+xml;base64, ${currentuser.profileImg}`} alt="" />
                <span className='font-semibold text-lg'>{currentuser.username}</span>
              </div>
            </div>
            <div className='flex flex-col gap-2 p-2 mt-5 h-[80%] overflow-y-auto scrollable-container'>
              <Chatlist Users={Users} handleReceiver={handleReceiver} checkreceiver={checkreceiver} />
            </div>
          </div>
          <div className=" mid h-full sm:w-[2px] bg-white"></div>
          <div className={`right h-full w-full sm:w-[60%] lg:w-[70%] sm:block ${!receiver?'hidden':''}`} >
            {!receiver ? <>
              <div className='h-full flex flex-col justify-center items-center'>
                <img width={200} height={200} src={logo} alt="" />
                <span className='font-semibold text-4xl'>Welcome {currentuser.username}</span>
                <span className='text-lg'> Select a Chat to Continue</span>
              </div>
            </> : <Chat_container receiver={receiver} currentuser={currentuser} socket={socket} handleReceiver={handleReceiver} />}
          </div>
        </div>
      </section>}
    </>
  )
}

export default Chat
