import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loginapi } from '../Api/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer'


const Login = () => {
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate('/chat')
    }

  }, [])

  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  let toastoptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
  }
  const handlecheck = async () => {
    if (form.username.length === 0 || form.password.length === 0)
      return toast.error("Fields cannot be empty", toastoptions)
    else {
      const res = await axios.post(loginapi, {
        username: form.username,
        password: form.password
      })
      if (res.data.status == false)
        return toast.error(res.data.msg, toastoptions)
      else {
        localStorage.setItem("chat-app-user", JSON.stringify(res.data))
        if (res.data.is_profile_set === false) {
          navigate("/setProfile")
        }
        else navigate('/chat')
      }
    }

  }



  return (
    < >
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
        <img src={logo} width={150} alt="" className='m-auto my-8 cursor-pointer' onClick={() => navigate("/")} />
        <form className='flex flex-col w-full sm:w-1/2 m-auto gap-5 items-center'>
          <input name='username' onChange={(e) => handleChange(e)} className="w-full bg-transparent border border-white px-5 py-2 rounded-lg text-lg hover:outline outline-offset-4 outline-1 cursor-pointer outline-white" type="email" placeholder='Enter username' />
          <input name='password' onChange={(e) => handleChange(e)} className="w-full bg-transparent border border-white px-5 py-2 rounded-lg text-lg hover:outline outline-offset-4 outline-1 cursor-pointer outline-white" type="password" placeholder='Enter password' />
          <button type="button" onClick={handlecheck} className="text-white w-1/2  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-2.5 py-2 sm:px-5 sm:py-2.5 text-center me-2 mb-2" >Log In</button>
        </form>
        <div className='text-center text-sm sm:text-lg m-2'>Do not have a Account ?
          <Link to='/register' className='italic font-semibold text-blue-600'> Register </Link>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Login
