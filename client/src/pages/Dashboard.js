import React from 'react'
import Layout from '../components/Layout.js'
import UserMenu from '../components/UserMenu.js'
import { useAuth } from '../context/Auth.js'
const Dashboard = ({ children }) => {

    const [auth, setAuth] = useAuth()
    return (
        <Layout title={'Dashboard - Shopcart'}  >

            <div
                className='flex max-[1000px]:flex-col min-w-full min-h-screen ' >
                <UserMenu />
                <div className='flex flex-1   min-h-screen box-border p-3 ' >
                    {children}
                    {
                        !children && (
                            <div className='flex flex-col justify-center min-w-full h-fit
                             box-border p-5 rounded-lg border mt-10 text-sm font-semibold text-zinc-500 ' >
                                <div className='flex items-center mb-2' ><h2>Name : </h2> <div className='flex justify-start rounded-lg items-center p-2 border w-fit ml-2' ><h1> {auth?.user?.name} </h1></div></div>
                                <div className='flex items-center mb-2' ><h2>Email : </h2> <div className='flex justify-start rounded-lg items-center p-2 border w-fit ml-2' ><h1> {auth?.user?.email} </h1></div></div>
                                <div className='flex items-center mb-2' ><h2>Phone : </h2> <div className='flex justify-start rounded-lg items-center p-2 border w-fit ml-2' ><h1> {auth?.user?.phone} </h1></div></div>
                                <div className='flex items-center mb-2' ><h2>Address : </h2> <div className='flex justify-start rounded-lg items-center p-2 border w-fit ml-2' ><h1> {auth?.user?.address} </h1></div></div>
                            </div>
                        )
                    }
                </div>
            </div>

        </Layout>
    )
}

export default Dashboard