import React from 'react'
import '.././styles/navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Auth'
import { useState } from 'react'
import ReactModal from 'react-modal';
import '../styles/Dropdown.css'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../config'
import { motion } from 'framer-motion'
import SidebarComponent from './SidebarComponent'
import SearchForm from './Form/SearchForm'
import useCategory from '../hooks/useCategory'
import { useCart } from '../context/Cart'

const Header = () => {

  const categories = useCategory()
  const [auth, setAuth] = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(false)
  const [cart] = useCart()

  const handleConfirmLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    })
    localStorage.removeItem('auth')
    navigate('/login')
    setOpen(false)
  }

  return (
    <div className='sticky h-fit top-0 bg-white z-50 font-Nunito flex min-w-full min-h-fit px-10 py-5 text-sm justify-between  box-border max-[700px]:px-5 max-h-20 ' >

      <div className='flex justify-center items-center min-h-fit' >


        <h3 className='text-xl font-extrabold	mx-2 max-[700px]:font-bold max-[700px]:text-sm max-[700px]:mx-1 '>
          Vesh</h3>


      </div>



      <div className='flex md:w-2/5 min-[1000px]:hidden ' >
        <div className='flex w-full justify-between items-center bg-gray-100 rounded-full mr-5 px-2  py-2  md:py-3 ' >
          <input type="text" className=' w-full bg-gray-100 focus:outline-none pl-3 placeholder:text-zinc-500 placeholder:font-medium rounded-full box-border text-xs ' placeholder='search here..' name="" id="" />
          <i className="fas fa-search scale-90 "></i>
        </div>

        <div className='flex' >
          <button onClick={() => setShowSidebar(true)} ><img src={`${BASE_URL}/images/burger.png`} className='h-5 opacity-70 ' alt="" />
          </button>
        </div>
      </div>

      <div className='flex justify-center max-[1000px]:hidden items-center min-h-fit min-w-fit' >

        <NavLink to='/' className='font-semibold transition-all underline-gray	hover:text-gray-950 dark:hover:text-gray-100'   >Home</NavLink>

        <NavLink to='/' className='drop-down font-semibold  transition-all 	hover:text-gray-950 dark:hover:text-gray-100 ml-5 '  >Category

          <div className="drop-down-content">
            <div className='py-2 bg-transparent'  ></div>
            <div className='dropdownoptionscontainer' >
              <Link className='font-Nunito font-semibold' to={`/categories`} >All Categories</Link>
              {
                categories?.map(cat => {
                  return (
                    <Link className='font-Nunito font-semibold' to={`/category/${cat.slug}`} >{cat.name}</Link>
                  )
                })
              }
            </div>
          </div>
        </NavLink>



        <SearchForm />

        <img src={`${BASE_URL}/images/user.png`} className='h-5 mr-2 opacity-60' alt="" />

        {
          !auth.user ? (<>
            <NavLink to='/register' className='font-semibold   transition-all underline-gray	mr-3 hover:text-gray-950 dark:hover:text-gray-100 '  >Register</NavLink>

            <h3 className='font-semibold   transition-all underline-gray	mr-3 '  >|</h3>
            <NavLink to='/login' className='font-semibold   transition-all underline-gray	mr-3 hover:text-gray-950 dark:hover:text-gray-100 '  >Login</NavLink>

          </>) : (
            <div className="drop-down mr-3">
              <button className=" font-Nunito font-semibold" >{auth?.user?.name} <i className="fa-solid fa-caret-down ml-2"></i> </button>
              <div className='drop-down-content' >
                <div className="drop-down-menu">

                  <div className="dropdownoptionscontainer  ">


                    <Link to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user/profile'}`} className='font-semibold' >Dashboard</Link>


                    <a href='#' onClick={handleConfirmLogout} >Logout</a>

                  </div>
                </div>
              </div>
            </div>
          )
        }



        <img src={`${BASE_URL}/images/bag.png`} className='h-5 mr-3 opacity-60 ml-3' alt="" />
        <NavLink to='/cart' className='font-semibold  transition-all underline-gray	mr-3 hover:text-gray-950 dark:hover:text-gray-100 '  >Cart ({cart?.length})</NavLink>

      </div>


      <SidebarComponent showSidebar={showSidebar} setShowSidebar={setShowSidebar} open={open} setOpen={open} handleConfirmLogout={handleConfirmLogout} />
    </div >
  )
}

export default Header