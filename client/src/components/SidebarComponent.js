import React from 'react'
import { BASE_URL } from '../config'
import { useAuth } from '../context/Auth'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ReactModal from 'react-modal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SidebarComponent = ({ showSidebar, setShowSidebar, }) => {

    const [auth, setAuth] = useAuth()
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()

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
        <div

            className={`flex flex-col box-border p-6 items-start min-h-full bg-white drop-shadow-xl w-72 z-50 absolute top-0 right-0  ${showSidebar ? '' : 'hidden'} rounded-md overflow-x-hidden `}>
            <div className='flex min-w-full justify-between ' >

                <button className='place-self-end ' onClick={() => setShowSidebar(false)} >
                    <img src={`${BASE_URL}/images/burger.png`} className='h-5' alt="" />
                </button>

                <div className='flex items-center'>
                    <img src={`${BASE_URL}/images/user.png`} className='h-4 opacity-70 ' alt="" />
                    <h3 className='font-semibold text-xs flex ml-2' > {auth?.user?.name} </h3>
                </div>

            </div>

            <div className='flex flex-col flex-1 min-w-full py-7 px-3 text-xs ' >
                <div>
                    <h1 className='mb-3 font-semibold' onClick={() => setShowSidebar(false)} ><Link to='/' >Account</Link></h1>

                    <h1 className='mb-2 ml-2' onClick={() => setShowSidebar(false)} ><Link to='/' >Home</Link></h1>
                    <h1 className=' mb-2 ml-2' onClick={() => setShowSidebar(false)}><Link to='/categories' >Categories</Link></h1>

                    <h1 className=' mb-2 ml-2' onClick={() => setShowSidebar(false)} ><Link to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} >Dashboard</Link></h1>
                    <h1 className=' mb-2 ml-2 ' onClick={() => setShowSidebar(false)} ><Link to='/cart' >Cart (0)</Link></h1>

                    {auth?.user && (

                        <h1 className=' mb-2 ml-2 font-semibold' onClick={() => { setOpen(true); setShowSidebar(false) }

                        } > &nbsp;Logout</h1>

                    )}

                    {
                        !auth?.user && (
                            <div>
                                <h1 className='font-semibold mb-3 ml-2' onClick={() => setShowSidebar(false)} ><Link to='/login' >Login</Link></h1>
                                <h1 className='font-semibold mb-3 ml-2' onClick={() => setShowSidebar(false)} ><Link to='/register' >Register</Link></h1>
                            </div>
                        )
                    }
                </div>

            </div>

            <ReactModal isOpen={open}

                style={{
                    overlay: {
                        position: 'absolute',
                        margin: 'auto',
                        right: 0,
                        bottom: 0,
                        // backgroundColor: 'yellow',
                        height: '200px',
                        // height: 'fit-content',
                        width: '100%',
                        maxWidth: '500px',
                        zIndex: '9999999'
                    },
                    content: {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        border: '1px solid #ccc',
                        background: 'transparent',
                        overflow: 'none',
                        // WebkitOverflowScrolling: 'touch',
                        borderRadius: '10px',
                        border: '1px solid #E0E0E0	',
                        outline: 'none',
                        padding: '20px',
                        paddingBottom: '0px'
                    }
                }}
            >
                <motion.div
                    initial={{ opacity: 0.5, y: '20%' }}
                    animate={{ opacity: 1, y: '0%' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    exit={{ opacity: 0 }}
                    className='flex justify-between flex-col' > <h2 className='font-Nunito text-zinc-600 text-xs mb-5' >Are you sure you want to Logout?</h2>
                    <div className='flex justify-end' >
                        <button className='font-Nunito text-zinc-100 text-xs  p-1 w-20 mr-2 rounded-lg bg-gradient-to-r from-pink-500 via-fuchsia-600 to-fuchsia-700 ... hover:scale-105 ease-in-out duration-300 opacity-70 '
                            onClick={handleConfirmLogout}
                        >Yes</button>
                        <button className='font-Nunito text-zinc-700 text-xs  p-1 w-20 border-2 border-zinc-300  rounded-lg hover:scale-105 ease-in-out duration-300 '
                            onClick={() => setOpen(false)}
                        >No</button>
                    </div></motion.div>
            </ReactModal>
        </div>
    )
}

export default SidebarComponent