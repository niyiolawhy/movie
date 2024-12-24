import React from 'react'
import { Link } from 'react-router-dom'
import { BiCameraMovie } from "react-icons/bi";
import DropDown from '../components/drop-down';
import { useNavigate } from 'react-router-dom';



function Navbar() {
  const navigate = useNavigate()
function handleLogout(){
  localStorage.removeItem('approve-it-user')
  navigate("/login")
}


  return (
    <div className='w-screen py-4 bg-[#1f2937] flex flex-col sm:flex-row justify-between items-center px-4  md:px-16   text-white'>
      <div className='flex items-center text-lg gap-2 mb-4 sm:mb-0'>
        <BiCameraMovie size={24} />
        <p className='font-bold text-center sm:text-left text-lg sm:text-xl'>Movie Library</p>
      </div>
      <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full sm:w-auto'>
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full sm:w-auto'>
          <Link to="/" className='hover:underline text-center sm:text-left'>Popular Movies</Link>
          <DropDown />
        </div>
        <div><button onClick={handleLogout} className='font-bold  text-red-600 hover:underline'>Logout</button></div>
      </div>
    </div>


  )
}

export default Navbar