import React from 'react'
import '.././styles/navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Auth'
import { useState } from 'react'
import ReactModal from 'react-modal';
import '../styles/Dropdown.css'
import { Link } from 'react-router-dom'

const Header = () => {

  const [auth, setAuth] = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const [openDropdown, setOpenDropdown] = useState(false)

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
    <div className='font-Nunito flex min-w-full min-h-fit px-10 py-5 text-sm justify-between  box-border' >

      <div className='flex justify-center items-center min-h-fit' >
        <img width="64" height="64" src="site_icon.png" className='h-8 w-8 opacity-75' alt="external-cart-untact-colored-outline-part-1-colored-outline-lafs" />

        <h3 className='text-xl font-extrabold	mx-2'>ShopCart</h3>


      </div>

      <div className='flex justify-center items-center min-h-fit min-w-fit' >



        <NavLink to='/' className='font-semibold  transition-all underline-gray	hover:text-gray-950 dark:hover:text-gray-100'   >Home</NavLink>

        <NavLink to='/category' className='font-semibold  transition-all underline-gray	hover:text-gray-950 dark:hover:text-gray-100 ml-5'  >Category</NavLink>

        <div className='search-box mx-10 dark:bg-zinc-700'  >
          <input className="search-text dark:text-gray-300" type="text" placeholder="Search Product" />
          <a href="#" className="search-btn">
            <i className="fas fa-search"></i>
          </a>
        </div>

        <img src="images/user.png" className='h-5 mr-2 opacity-60' alt="" />

        {
          !auth.user ? (<>
            <NavLink to='/register' className='font-semibold   transition-all underline-gray	mr-3 hover:text-gray-950 dark:hover:text-gray-100 '  >Register</NavLink>

            <h3 className='font-semibold   transition-all underline-gray	mr-3 '  >|</h3>
            <NavLink to='/login' className='font-semibold   transition-all underline-gray	mr-3 hover:text-gray-950 dark:hover:text-gray-100 '  >Login</NavLink>

          </>) : (
            <div className="dropdown mr-3">
              <button className="dropdown-toggle font-Nunito font-semibold" onClick={() => setOpenDropdown(!openDropdown)}>{auth?.user?.name} <i className="fa-solid fa-caret-down ml-2"></i> </button>
              {openDropdown && (
                <div className="dropdown-menu">
                  <button className='hover:scale-95 duration-300' onClick={() => setOpenDropdown(false)} ><Link to='/dashboard' >Dashboard</Link></button>
                  <button className='mb-2 hover:scale-95 duration-300' id='logout' onClick={() => setOpen(true)} >Logout</button>
                </div>
              )}
            </div>
          )
        }

        <img src="images/bag.png" className='h-5 mr-3 opacity-60 ml-3' alt="" />
        <NavLink to='/cart' className='font-semibold  transition-all underline-gray	mr-3 hover:text-gray-950 dark:hover:text-gray-100 '  >Cart (0)</NavLink>

      </div>

      <ReactModal isOpen={open}
        style={{
          overlay: {
            position: 'fixed',
            margin: 'auto',
            right: 0,
            bottom: 0,
            // backgroundColor: 'yellow',
            height: '200px',
            // height: 'fit-content',
            width: '50%',
            maxWidth: '500px'
          },
          content: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'none',
            // WebkitOverflowScrolling: 'touch',
            borderRadius: '10px',
            border: '1px solid #E0E0E0	',
            outline: 'none',
            padding: '20px'
          }
        }}
      >
        <h2 className='font-Nunito text-zinc-600 text-sm' >Are you sure you want to Logout?</h2>
        <div className='flex justify-end' >
          <button className='font-Nunito text-zinc-100 text-sm  p-1.5 w-28 mr-2 rounded-lg bg-gradient-to-r from-pink-500 via-fuchsia-600 to-fuchsia-700 ... hover:scale-105 ease-in-out duration-300 opacity-70 '
            onClick={handleConfirmLogout}
          >Yes</button>
          <button className='font-Nunito text-zinc-700 text-sm border-2 border-zinc-300 p-1.5 w-28 rounded-lg hover:scale-105 ease-in-out duration-300 '
            onClick={() => setOpen(false)}
          >No</button>
        </div>
      </ReactModal>



    </div >
  )
}

export default Header