import React, { useState,useEffect } from 'react'
import Navbar from '../components/Navbar'
import logo from '../assets/logo.png'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {registerapi} from '../Api/api'
import axios, { Axios } from 'axios'
import Footer from '../components/Footer'



const Register = () => {
  useEffect(() => {
    if(localStorage.getItem("chat-app-user")){
      navigate('/chat')
    }

  }, [])
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username:'',
    email:'',
    password:'',
    "confirm-pass":''
  })
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handlecheck= async() => {
    // (form)
    if(form.username.length==0||form.email.length==0||form.password.length==0||form['confirm-pass'].length==0){
      return toast.error("Fields cannot be empty",toastoptions)
    }
    if(form.password!=form['confirm-pass']){
    return  toast.error("Passwords must be same",toastoptions)
    }
    else{
    const res= await axios.post(registerapi,{
      username:form.username,
      email:form.email,
      password:form.password
    }
    )
  //  (res.data.status)
   if(res.data.status===false)
   return toast.error(res.data.msg,toastoptions)
   else{
    localStorage.setItem("chat-app-user",JSON.stringify(res.data.user))
   navigate('/setProfile')
   }
 
  }
  }
  
  let toastoptions={
    position: "top-center",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark"
  }
 

  return (
    <div >
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        
/>
      <div className="-z-10 absolute h-screen w-full bg-slate-950"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div></div>
      <Navbar />
      <div className='w-[80%] m-auto'>
        <img src={logo} width={150} alt="" className='m-auto cursor-pointer' onClick={() => navigate("/")} />
        <form className='flex flex-col w-full sm:w-1/2 m-auto gap-3 items-center'>
          <input onChange={(e) => handleChange(e)} name='email' className="w-full bg-transparent border border-white px-5 py-2 rounded-lg text-base sm:text-lg hover:outline outline-offset-4 outline-1 cursor-pointer outline-white" type="email" placeholder='Enter email' />
          <input onChange={(e) => handleChange(e)} name='username' className="w-full bg-transparent border border-white px-5 py-2 rounded-lg text-base sm:text-lg hover:outline outline-offset-4 outline-1 cursor-pointer outline-white" type="text" placeholder='Enter Username' />
          <input onChange={(e) => handleChange(e)} name='password' className="w-full bg-transparent border border-white px-5 py-2 rounded-lg text-base sm:text-lg hover:outline outline-offset-4 outline-1 cursor-pointer outline-white" type="password" placeholder='Enter password' />
          <input onChange={(e) => handleChange(e)} name='confirm-pass' className="w-full bg-transparent border border-white px-5 py-2 rounded-lg text-base sm:text-lg hover:outline outline-offset-4 outline-1 cursor-pointer outline-white" type="password" placeholder='Confirm password' />
          <button type="button" className="text-white w-1/2  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2" onClick={()=>handlecheck(form)}>Register</button>

        </form>
        <div className='text-center text-sm sm:text-lg m-2'>Alread have a Account ?
          <Link to='/login' className='italic font-semibold text-blue-600'> Log In </Link>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Register
