import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';
import { useAuth } from '../context/Auth';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import axios from 'axios';

const SidebarComponent = ({ showSidebar, setShowSidebar }) => {
    const [auth, setAuth] = useAuth();
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useCart();
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const getAllcategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllcategories();
    }, []);

    const handleConfirmLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: '',
        });
        localStorage.removeItem('auth');
        navigate('/login');
        setOpen(false);
    };
    return (

        <motion.div
            className={`flex flex-col box-border p-6 items-start min-h-screen bg-white drop-shadow-xl w-60 z-50 absolute top-0 right-0 ${showSidebar ? '' : 'hidden'
                } rounded-md overflow-x-hidden`}
            initial={{ x: 300 }} // Initial position: slide in from the right
            animate={{ x: 0 }} // Final position: slide to the left
            transition={{ duration: 0.3 }} // Animation duration in seconds
        >
            <div

                className={`flex flex-col box-border p-6 items-start min-h-screen bg-white drop-shadow-xl  w-60 z-50 absolute top-0 right-0  ${showSidebar ? '' : 'hidden'} rounded-md overflow-x-hidden `}>
                <div className='flex min-w-full justify-between ' >

                    <button className='place-self-end ' onClick={() => setShowSidebar(false)} >
                        <img src={`${BASE_URL}/images/burger.png`} className='h-5' alt="" />
                    </button>

                    <div className='flex items-center'>
                        <img src={`${BASE_URL}/images/user.png`} className='h-4 opacity-70 ' alt="" />
                        <h3 className='font-semibold text-xs flex ml-2' > {auth?.user?.name} </h3>
                    </div>

                </div>

                <div className='flex flex-col flex-1 min-w-full py-7 px-3 text-xs font-medium' >
                    <div>
                        <h1 className='mb-4 font-semibold text-sm text-zinc-700' onClick={() => setShowSidebar(false)} ><Link to='/' >Account</Link></h1>
                        <div className='pl-2' >

                            <h1 className='mb-3 ' onClick={() => setShowSidebar(false)} ><Link to='/' >Home</Link></h1>
                            <h1 className=' mb-3' onClick={() => setShowSidebar(false)}><Link to='/categories' >Categories</Link></h1>

                            <h1 className=' mb-3' onClick={() => setShowSidebar(false)} ><Link to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user/profile'}`} >Dashboard</Link></h1>
                            <h1 className=' mb-3 ' onClick={() => setShowSidebar(false)} ><Link to='/cart' >Cart ({cart?.length})</Link></h1>

                            {
                                auth?.user && (
                                    <h1 className='mb-2 font-medium' onClick={() => { setOpen(true); setShowSidebar(false) }

                                    } > < button onClick={handleConfirmLogout} >Logout</button> </h1>
                                )
                            }
                            {
                                !auth?.user && (
                                    <div>
                                        <h1 className='font-medium mb-3 ' onClick={() => setShowSidebar(false)} ><Link to='/register' >Register</Link></h1>
                                        <h1 className='font-medium mb-2 ' onClick={() => setShowSidebar(false)} ><Link to='/login' >Login</Link></h1>

                                    </div>
                                )
                            }

                        </div>

                        <h3 className='mt-7 text-sm text-zinc-700 font-semibold mb-4' >Top Categories</h3>
                        <div className='flex flex-col pl-2' >
                            {
                                categories?.map((c) => {
                                    return (
                                        <Link to={`/category/${c.slug}`}  ><h1 className='mb-3'>{c.name}</h1></Link>
                                    )
                                })
                            }
                        </div>

                    </div>



                </div>


            </div>

        </motion.div>
    )
}

export default SidebarComponent