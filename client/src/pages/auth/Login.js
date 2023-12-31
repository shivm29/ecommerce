import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/Auth'

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login', { email, password })

            if (res.data.success) {
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || '/')

            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }



    return (
        <Layout title={"Login | Vesh"} >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.75, ease: 'easeIn' }}
                exit={{ opacity: 0 }}
                className='flex justify-between items-center  min-h-screen min-w-full mt-4 ' >

                <div className='flex min-h-screen flex-1 max-[1200px]:hidden '
                    style={{
                        backgroundImage: "url('images/login_page_model.png')",
                        opacity: '.9',
                        // Replace with the actual image path
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >

                </div>
                <motion.div
                    initial={{ opacity: 0.5, y: '20%' }}
                    animate={{ opacity: 1, y: '0%' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    exit={{ opacity: 0 }}
                    className='flex min-h-screen flex-1 items-start  pt-32 justify-center box-border pb-10 max-[1200px]:pb-1 max-[1200px]:px-5 max-[1200px]:pt-20 max-[800px]:px-10' >
                    <div className='flex justify-center flex-col' >
                        <h1 className='text-6xl font-extrabold mb-5 max-[1200px]:text-3xl max-[1200px]:mb-4' >Welcome Back !</h1>
                        <h2 className='font-semibold ml-1 mb-5 max-[1200px]:text-sm max-[1200px]:mb-5 ' >Welcome to the Login page. We are glad to see you back !</h2>

                        <form action="" onSubmit={handleSubmit} >
                            <div className='min-w-full '  >
                                <div className='min-w-full' >
                                    <label className="custom-field one min-w-full ">
                                        <input type="email" placeholder=" " required
                                            className='min-w-full'
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <span className="placeholder">Email</span>
                                    </label>
                                </div>

                                <div className='min-w-full' >
                                    <label className="custom-field one mr-3 max-[1200px]:min-w-full  ">
                                        <input className='min-w-full' type="password" placeholder=" " required
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span className="placeholder">Password</span>
                                    </label>
                                </div>

                                <div className='  max-[1200px]:flex min-w-full justify-end max-[1200px]:mt-16' >
                                    <button type='submit' className='p-3 px-6 my-10 bg-zinc-700 text-white font-semibold hover:bg-zinc-600 transform duration-100 ease-in-out max-[800px]:text-xs max-[800px]:font-medium '  >Login</button>
                                </div>
                            </div>
                        </form>

                        <h3 className='text-zinc-500 ml-2 mb-4  text-sm font-semibold max-[1200px]:text-xs max-[800px]:font-medium' >New to ShopCart? <span className='text-zinc-800 cursor-pointer font-semibold text-sm max-[1200px]:text-xs' ><Link to='/register' > Create a new account </Link></span>   </h3>

                        <span className='text-zinc-800 cursor-pointer  font-semibold ml-2 text-sm max-[1200px]:text-xs place-self-end max-[1200px]:place-self-start  ' ><Link to='/forgot-password' > Forgot password ? </Link></span>
                    </div>
                </motion.div>
            </motion.div>
        </Layout>
    )
}

export default Login