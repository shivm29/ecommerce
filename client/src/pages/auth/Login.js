import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout'
import { motion } from 'framer-motion'
const Login = () => {



    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login', { email, password })

            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/')
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
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
                        backgroundImage: "url('images/register_pic.jpg')", // Replace with the actual image path
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
                    className='flex min-h-screen flex-1 items-center justify-center box-border pb-10' >
                    <div className='flex justify-center flex-col' >
                        <h1 className='text-6xl font-extrabold mb-5 ' >Welcome Back !</h1>
                        <h2 className='font-semibold ml-1 mb-5' >Welcome to ShopCart Login page. We are glad to see you back !</h2>

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
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span className="placeholder">Password</span>
                                    </label>
                                </div>

                                <button type='submit' className='  ease-in-out duration-300 my-12 ml-1.5 w-1/4 text-white bg-gradient-to-r from-pink-500 via-fuchsia-600 to-fuchsia-700 ... p-3 rounded-lg font-bold hover:scale-105' >Login</button>
                            </div>
                        </form>

                        <h3 className='text-zinc-700 ml-2 mb-10 text-sm font-semibold' >New to ShopCart? <span className='text-pink-500 cursor-pointer  font-bold' ><Link to='/register' > Create a new account </Link></span></h3>
                    </div>
                </motion.div>
            </motion.div>
        </Layout>
    )
}

export default Login