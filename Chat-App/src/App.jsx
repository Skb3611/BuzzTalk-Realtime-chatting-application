import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import logo from './assets/logo.png'
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom'



function App() {
  
  useEffect(() => {
    let user =JSON.parse(localStorage.getItem("chat-app-user"))
    if(user){
      if(user.is_profile_set===false)
      navigate('/setProfile')
      else navigate('/chat')
    }
   
  }, [])
  const navigate =useNavigate()
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg overflow-hidden">
        <div className="-z-10 absolute h-screen w-full bg-slate-950"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div></div>
        <div className='text-white'>
          <Navbar />
          <div className='my-10 m-auto w-full px-5 sm:w-[80%]'>
            <div className="head flex flex-col justify-center items-center">
              <img src={logo} width={200} alt="" />
              <span className='text-lg sm:text-2xl font-semibold'>BuzzTalk</span>
              <TypeAnimation
              className='text-lg sm:text-2xl text-center h-5'
                sequence={[
                  "Where Conversations Come Alive!", 1000,
                  "Join Buzz and Connect with the World.", 1000
                ]}
                speed={50}
                // style={{fontSize:"1rem",fontStyle: 'italic' }}
                repeat={Infinity} // or repeat={Infinity}
              />

            </div>
            <div className="buttons flex justify-center items-end sm:items-center my-20">
              <button type="button" className="w-3/6 sm:w-1/3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2.5 py-2 sm:px-5 sm:py-2.5 text-center me-2 mb-2" onClick={() => { navigate("/login") }}>Log In</button>
              <button type="button" className="w-3/6 sm:w-1/3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2.5 py-2 sm:px-5 sm:py-2.5 text-center me-2 mb-2" onClick={() => { navigate("/register") }}>Sign Up</button>

            </div>
          </div>
      <Footer/>
        </div>
      </div>
</>
  )
}

export default App
