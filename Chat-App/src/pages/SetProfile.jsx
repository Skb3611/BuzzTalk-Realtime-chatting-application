import React, { useState, useEffect } from 'react'
import { Buffer } from "buffer";
import axios from 'axios';
import loader from '../assets/loader.gif'
import { useNavigate } from 'react-router-dom';
import { setProfileapi } from '../Api/api';
import Navbar from '../components/Navbar';
const SetProfile = () => {
    const [avtars, setavtars] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [Selected, setSelected] = useState(undefined)
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('chat-app-user'))
            navigate('/login')
        else {
            let data = JSON.parse(localStorage.getItem('chat-app-user'))
    
            if (data.is_profile_set)
                navigate('/chat')
        }
    }, [])

    useEffect(() => {
        async function getdata() {
            let imgdata = []
            for (let i = 0; i < 5; i++) {
                let a = await axios.get(`https://api.multiavatar.com/${Math.floor(Math.random() * 10000)}?apikey=uvj7rJdwi8OT05
                `)
                const buffer = new Buffer(a.data)
                imgdata.push(buffer.toString("base64"))
            }
            setavtars(imgdata)
            setIsLoading(false)
        }
        getdata()
    }, [])
    const handleselect = (item) => {
        setSelected(item)
     
    }
    const isSelected = (params) => {
        if (Selected == params) {
            return true
        }
        else return false
    }

    const handlesubmit = async (params) => {
        const user = JSON.parse(localStorage.getItem('chat-app-user'))
        let { data } = await axios.post(setProfileapi, { ...user, Selected })
    
        localStorage.setItem('chat-app-user', JSON.stringify(data))
        navigate('/chat')
    }


    return (
        <>
            <div className="-z-10 absolute h-screen w-full bg-slate-950"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div></div>
            {isLoading ? <>
                <div className='h-screen w-screen flex justify-center items-center'>
                    <img src={loader} alt="" />
                </div>
            </> : (<>
                    <Navbar/>
                <div className="main w-3/4 h-[80vh] m-auto flex justify-center items-center flex-col gap-8">

                    <div className='text-center text-xl sm:text-3xl'>Select Your Avatar</div>
                    <div className="avtars flex flex-wrap justify-center items-center gap-10">
                        {avtars.map(item => {
                            return (
                                <div key={Math.random()} className='cursor-pointer' onClick={() => handleselect(item)}>
                                    <img src={`data:image/svg+xml;base64,${item}`} width={100} alt="" className={`${isSelected(item) ? "border-fuchsia-700 rounded-full border-4 border-spacing-10" : ""}`} />
                                </div>
                            )
                        })}
                    </div>
                    <button type="button" className="w-2/6 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2.5 py-2 sm:px-5 sm:py-2.5 text-center me-2 mb-2" onClick={handlesubmit}   >Select</button>
                </div>
                </>
            )}


        </>
    )
}

export default SetProfile
