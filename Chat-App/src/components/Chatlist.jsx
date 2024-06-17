import React from 'react'

const Chatlist = ({Users,handleReceiver,checkreceiver}) => {
  return (
    <>
      
        {Users && Users.map((user) => {
          return (
            <div key={user._id} onClick={()=>handleReceiver(user)} className={`item flex cursor-pointer items-center gap-4 p-3 rounded-md ${checkreceiver(user)?'bg-gray-700 border':'bg-black'}`}>
              <img width={50} src={`data:image/svg+xml;base64, ${user.profileImg}`} alt="" />
              <span className='font-semibold text-lg'>{user.username}</span>
            </div>
          )
        })}
    
    </>
  )
}

export default Chatlist
