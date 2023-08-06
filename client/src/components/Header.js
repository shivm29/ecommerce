import React from 'react'
import '.././styles/searchbar.css'
import { NavLink } from 'react-router-dom'
import '.././styles/root_style.css'



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

        <i class="fa-regular fa-user font-semibold  mr-3 text-lg "></i>

        <NavLink to='/register' className='font-semibold   transition-all underline-gray	mr-3 hover:text-gray-950 dark:hover:text-gray-100 '  >Register</NavLink>

        <h3 className='font-semibold   transition-all underline-gray	mr-3 '  >|</h3>
        <NavLink to='/login' className='font-semibold   transition-all underline-gray	mr-3 hover:text-gray-950 dark:hover:text-gray-100 '  >Login</NavLink>



        <i class="fa-solid fa-cart-shopping font-semibold  mx-3 text-lg hover:text-gray-950 dark:hover:text-gray-100 "></i>
        <NavLink to='/cart' className='font-semibold  transition-all underline-gray	mr-3 hover:text-gray-950 dark:hover:text-gray-100 '  >Cart (0)</NavLink>

      </div>
    </div>
  )
}

export default Header