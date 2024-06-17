import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [user, setuser] = useState()
  useEffect(() => {
    (async function () {
      if(await localStorage.getItem('chat-app-user'))
        setuser(await localStorage.getItem('chat-app-user'))
    }())
  }, [])

  return (
    <>
      <div className='flex justify-between items-center p-2 sm:p-3'>
        <div className="logo flex justify-center items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src={logo} width={50} alt="" />
          <span className='text-sm sm:text-xl'>BuzzTalk</span>
        </div>
        <div className="buttons">
          {!user ? <><button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2.5 py-2 sm:px-5 sm:py-2.5 text-center me-2 mb-2" onClick={() => { navigate("/login") }}>Log In</button>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2.5 py-2 sm:px-5 sm:py-2.5 text-center me-2 mb-2" onClick={() => { navigate("/register") }}>Sign Up</button></> : <>
            <div className='text-white'>
              {user.username}
            </div>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2.5 py-2 sm:px-5 sm:py-2.5 text-center me-2 mb-2" onClick={() => { navigate("/"); localStorage.clear()}}>Log out</button>
          </>}
        </div>
      </div>
      <div className="main">
        <div className="head"></div>
      </div>
    </>
  )
}

export default Navbar
