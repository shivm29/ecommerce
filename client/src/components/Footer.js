import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import '.././styles/footer.css'

const Footer = () => {
  return (
    <div className='text-sm font-Nunito flex justify-between items-center box-border px-20 py-7 bg-zinc-100  max-[1000px]:px-4 max-[1000px]:text-xs max-[500px]:flex-col max-[500px]:justify-center ' >
      <h3 className='max-[500px]:mb-5' >All rights reserved &copy; shivm-dev</h3>
      <div className='flex max-[500px]:min-w-full max-[500px]:justify-center' >

        <NavLink to='/about' className='  transition-all underline-gray	hover:text-gray-950 dark:hover:text-gray-100 mr-5 font-semibold'  >About</NavLink>

        <NavLink to='/contact' className='  transition-all underline-gray	hover:text-gray-950 dark:hover:text-gray-100 mr-5 font-semibold'  >Contact</NavLink>

        <NavLink to='/privacy-policy' className='  transition-all underline-gray	hover:text-gray-950 dark:hover:text-gray-100 mr-5 font-semibold max-[500px]:mr-0 '  >Privacy-policy</NavLink>


      </div>
    </div>
  )
}

export default Footer