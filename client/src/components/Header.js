import React from 'react'
import '.././styles/navbar.css'
import { NavLink } from 'react-router-dom'



const Header = () => {


  return (
    <div className='font-Nunito flex min-w-full min-h-fit px-10 py-5 text-sm justify-between  box-border' >

      <div className='flex justify-center items-center min-h-fit' >
        <img width="64" height="64" src="https://img.icons8.com/external-colored-outline-lafs/64/external-cart-untact-colored-outline-part-1-colored-outline-lafs.png" className='h-8 w-8' alt="external-cart-untact-colored-outline-part-1-colored-outline-lafs" />

        <h3 className='text-xl font-extrabold	mx-2'>ShopCart</h3>


      </div>

      <div className='flex justify-center items-center min-h-fit min-w-fit' >



        <NavLink to='/' className='font-semibold  transition-all underline-gray	hover:text-gray-950 dark:hover:text-gray-100' activeClassName='active'  >Home</NavLink>

        <NavLink to='/category' className='font-semibold  transition-all underline-gray	hover:text-gray-950 dark:hover:text-gray-100 ml-5'  >Category</NavLink>

        <div className='search-box mx-10 dark:bg-zinc-700'  >
          <input class="search-text dark:text-gray-300" type="text" placeholder="Search Product" />
          <a href="#" class="search-btn">
            <i class="fas fa-search"></i>
          </a>
        </div>

        <img src="images/user.png" className='h-5 mr-3 opacity-60' alt="" />

        <NavLink to='/register' className='font-semibold   transition-all underline-gray	mr-3 hover:text-gray-950 dark:hover:text-gray-100 '  >Register</NavLink>

        <h3 className='font-semibold   transition-all underline-gray	mr-3 '  >|</h3>
        <NavLink to='/login' className='font-semibold   transition-all underline-gray	mr-3 hover:text-gray-950 dark:hover:text-gray-100 '  >Login</NavLink>



        <img src="images/bag.png" className='h-5 mr-3 opacity-60 ml-3' alt="" />
        <NavLink to='/cart' className='font-semibold  transition-all underline-gray	mr-3 hover:text-gray-950 dark:hover:text-gray-100 '  >Cart (0)</NavLink>

      </div>
    </div>
  )
}

export default Header