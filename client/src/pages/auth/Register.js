import React, { useState } from 'react'
import Layout from '../../components/Layout'
import '../../styles/registrationForm.css'
import { Link } from 'react-router-dom'

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, password, phone, password, address)
    }


    return (
        <Layout>
            <div className='flex justify-between items-center  min-h-screen min-w-full mt-4 ' >

                <div className='flex min-h-screen flex-1 '
                    style={{
                        backgroundImage: "url('images/register_pic.jpg')", // Replace with the actual image path
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >

                </div>
                <div className='flex min-h-screen flex-1 items-center justify-center box-border pb-10' >
                    <div className='flex justify-center flex-col' >
                        <h1 className='text-6xl font-extrabold mb-5 ' >Create new account</h1>
                        <h2 className='font-semibold ml-1 mb-10' > Welcome to ShopCart Signup page</h2>

                        <form action="" onSubmit={handleSubmit} >
                            <div>
                                <div>
                                    <label className="custom-field one mr-3">
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
                                <button type='submit' className='  ease-in-out duration-300 my-12 ml-2 w-1/4 text-white bg-gradient-to-r from-pink-500 via-fuchsia-600 to-fuchsia-700 ... p-3 rounded-lg font-bold hover:scale-105' >Sign up</button>
                            </div>
                        </form>

                        <h3 className='text-zinc-700 ml-2 text-sm font-semibold' >Already have an account? <span className='text-pink-500 cursor-pointer  font-bold' ><Link to='/login' > Login </Link></span></h3>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Register