import React from 'react'
import Layout from '../../components/Layout'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [answer, setAnswer] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgot-password', { email, newPassword, answer })

            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.75, ease: 'easeIn' }}
                exit={{ opacity: 0 }}
                className='flex justify-between items-center  min-h-screen min-w-full mt-4 ' >

                <div className='flex min-h-screen flex-1 '
                    style={{
                        backgroundImage: "url('images/forgot_wallpaper.jpg')",
                        opacity: '.9',
                        // Replace with the actual image path
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: '.7'
                    }}
                >

                </div>
                <motion.div
                    initial={{ opacity: 0.5, y: '20%' }}
                    animate={{ opacity: 1, y: '0%' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    exit={{ opacity: 0 }}
                    className='flex min-h-screen flex-1  justify-center items-start  pt-24 box-border pb-10' >
                    <div className='flex justify-center flex-col' >
                        <img src="images/finger_print.png" className='h-16 w-16 opacity-70 mb-5' alt="" />
                        <h1 className='text-6xl font-extrabold mb-5 ' >Forgot Password?</h1>
                        <h2 className='font-semibold ml-1 mb-5' >No worries ! Just enter your favorite movie name</h2>

                        <form action="" onSubmit={handleSubmit} >
                            <div className='min-w-full '  >
                                <div className='min-w-full' >
                                    <label className="custom-field one min-w-full">
                                        <input type="email" placeholder=" " required
                                            className='min-w-full'
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <span className="placeholder">Email</span>
                                    </label>
                                </div>

                                <div>
                                    <label className="custom-field one mr-3">
                                        <input type="password" placeholder=" " required
                                            value={answer} onChange={(e) => setAnswer(e.target.value)}
                                        />
                                        <span className="placeholder">Favorite Movie ?</span>
                                    </label>
                                    <label className="custom-field one mr-3">
                                        <input type="password" placeholder=" " required
                                            value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <span className="placeholder">New Password</span>
                                    </label>
                                </div>

                                <button type='submit' className='  ease-in-out duration-300 my-12 ml-1.5 min-w-fit text-white bg-gradient-to-r from-pink-500 via-fuchsia-600 to-fuchsia-700 ... opacity-70 p-3 rounded-lg font-bold hover:scale-105' >Reset Password</button>
                            </div>
                        </form>
                        <h3 className='text-zinc-700 ml-2 mb-4  text-sm font-semibold' >Go back to <span className='text-pink-500 cursor-pointer  font-semibold text-sm' ><Link to='/login' > Login? </Link></span>   </h3>
                    </div>
                </motion.div>
            </motion.div>
        </Layout>
    )
}

export default ForgotPassword