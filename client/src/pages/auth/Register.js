import React, { useState } from 'react'
import Layout from '../../components/Layout'
import '../../styles/registrationForm.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register', { name, email, password, phone, address, answer })

            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
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

                <div className='flex min-h-screen flex-1 max-[1200px]:hidden '
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
                    className='flex min-h-screen  flex-1  pt-15 justify-center items-start box-border  pt-28 max-[1200px]:pt-10 max-[1200px]:pb-1 max-[1200px]:px-5 max-[800px]:px-10 ' >
                    <div className='flex justify-center flex-col' >
                        <h1 className='text-6xl font-extrabold mb-5 max-[1200px]:text-3xl max-[1200px]:mb-3' >Create new account</h1>
                        <h2 className='font-semibold ml-1 mb-10 max-[1200px]:text-sm max-[1200px]:mb-5' > Welcome to ShopCart Signup page</h2>

                        <form action="" onSubmit={handleSubmit} >
                            <div>
                                <div >
                                    <label className="custom-field one mr-3 ">
                                        <input type="text" placeholder=" " required
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                        <span className="placeholder">Name</span>
                                    </label>
                                    <label className="custom-field one">
                                        <input type="email" placeholder=" " required
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
                                    <label className="custom-field one mr-3">
                                        <input type="password" placeholder=" " required
                                            value={answer} onChange={(e) => setAnswer(e.target.value)}
                                        />
                                        <span className="placeholder">What's your favorite movie?</span>
                                    </label>
                                </div>

                                <div>
                                    <label className="custom-field one mr-3">
                                        <input type="text" placeholder=" " required
                                            value={phone} onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <span className="placeholder">Phone</span>
                                    </label>
                                    <label className="custom-field one">
                                        <input type="text" placeholder=" " required
                                            value={address} onChange={(e) => setAddress(e.target.value)}
                                        />
                                        <span className="placeholder">Address</span>
                                    </label>
                                </div>
                                <div className='  max-[1200px]:flex min-w-full justify-end max-[800px]:justify-start max-[800px]:ml-1 max-[1200px]:mt-16' >
                                    <button type='submit' className='p-3 px-6 my-10 bg-zinc-700 text-white font-semibold hover:bg-zinc-600 transform duration-100 ease-in-out max-[800px]:text-xs max-[800px]:font-medium max-[800px]:mt-0 max-[800px]:mb-20'  >Register Now</button>
                                </div>
                            </div>
                        </form>

                        <h3 className='text-zinc-500 ml-2 mb-10 text-sm font-semibold max-[1200px]:text-xs max-[800px]:font-medium' >Already have an account? <span className='text-pink-800 cursor-pointer  font-bold' ><Link to='/login' > Login </Link></span></h3>
                    </div>
                </motion.div>
            </motion.div>
        </Layout>
    )
}

export default Register