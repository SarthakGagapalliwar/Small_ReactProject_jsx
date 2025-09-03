import React, { useState } from 'react'
import { setLocalStorage } from '../utils/localStoraage'

const Header = (props) => {

  const [username, setUserName]=useState('')
  // if(!data){
  //   setUserName("Admin")
  // }else{
  //   setUserName(data.firstName)
  // }

  const handleLogOut=()=>{
    
    localStorage.setItem('loggedInUser','')
    props.changeUser('')
    
  }

  return (
    <div className='flex items-end justify-between'>
        <h1 className='text-2xl font-medium'>Hello <br /> <span className='text-3xl font-semibold'>usernaem👋🏼</span> </h1>
        <button onClick={handleLogOut} className="bg-red-500 text-lg font-medium text-white px-5 py-2 rounded-sm cursor-pointer">Log Out</button>
    </div>
  )
}

export default Header;