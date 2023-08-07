import React from 'react'
import Layout from '../components/Layout'
import { NavLink } from 'react-router-dom'
const PageNotFound = () => {
    return (
        <Layout>
            <div className=' flex justify-center items-center' style={{ minHeight: "70vh" }} >
                <div className='flex justify-center items-center flex-col' >
                    <h1 className='text-9xl font-bold cursor-default mb-5' >404 :(</h1>
                    <h2 className='text-2xl cursor-default mb-2 font-bold ' >GO HOME, YOU'RE DRUNK!</h2>
                    <h3 className='mb-10 font-semibold' >You are too drunk for the page. Just go home dude!</h3>
                    <NavLink to='/' className='p-4 rounded-3xl border-solid border-2 border-gray-500 font-bold text-md hover:bg-zinc-100' >BACK TO HOME</NavLink>
                </div>
            </div>
        </Layout>
    )
}

export default PageNotFound