import React, { useState, useEffect } from 'react'
import Dashboard from '../Dashboard'
import { useAuth } from '../../context/Auth'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Profile = () => {

  const [auth, setAuth] = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put('/api/v1/auth/profile', { name, email, password, phone, address })

      if (data?.error) {
        toast.error(data.error)
      }
      else {
        setAuth({ ...auth, user: data?.updatedUser })

        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)

        ls.user = data.updatedUser
        localStorage.setItem('auth', JSON.stringify(ls))
        toast.success("Profile updated successfully")
      }

    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    const { email, name, phone, address } = auth?.user
    setName(name)
    setPhone(phone)
    setEmail(email)
    setAddress(address);
  }, [auth?.user])

  return (
    <Dashboard title={"Your profile"} >
      <div
        className='flex max-[1000px]:flex-col min-w-full min-h-screen border-t border-l border-zinc-500 ' >
        <div className='flex flex-1 justify-center  min-h-screen box-border p-3 ' >
          <div

            className='flex min-h-screen  flex-1  pt-15 justify-center items-start box-border  pt-28 max-[1200px]:pt-10 max-[1200px]:pb-1 max-[1200px]:px-5 max-[800px]:p-0 ' >
            <div className='flex justify-center flex-col' >
              <h1 className='text-6xl font-extrabold mb-5 max-[1200px]:text-3xl max-[1200px]:mb-3 max-[800px]:text-lg max-[800px]:mt-5' >Your Details</h1>
              <h2 className='font-semibold ml-1 mb-10 max-[1200px]:text-sm max-[1200px]:mb-5 max-[800px]:text-sm max-[800px]:mb-2 ' > Welcome to Dashboard</h2>

              <form action="" onSubmit={handleSubmit}  >

                <div  >
                  <label className="custom-field one mr-3">
                    <input type="text" placeholder=" " required
                      value={name} onChange={(e) => setName(e.target.value)} />
                    <span className="placeholder">Name</span>
                  </label>
                  <label className="custom-field one">
                    <input disabled type="email" placeholder=" " required
                      value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="placeholder">Email</span>
                  </label>
                </div>

                <div>
                  <label className="custom-field one mr-3">
                    <input type="password" placeholder=" " 
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
                <div className='  max-[1200px]:flex min-w-full justify-end max-[1200px]:mt-16' >
                  <button type='submit' className='p-3 px-6 my-10 bg-zinc-700 text-white font-semibold hover:bg-zinc-600 transform duration-100 ease-in-out max-[800px]:text-xs max-[800px]:my-0 '  >Update</button>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>

    </Dashboard>
  )
}

export default Profile