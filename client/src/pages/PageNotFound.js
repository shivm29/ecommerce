import React from 'react'
import Layout from '../components/Layout'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const PageNotFound = () => {
    return (
        <Layout title={'Page not found - Vesh'} >
            <motion.div
                initial={{ opacity: 0.5, y: '20%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                exit={{ opacity: 0 }}
                className=' flex justify-center items-center' style={{ minHeight: "70vh" }} >
                <div className='flex justify-center items-center flex-col' >
                    <h1 className='text-9xl font-bold cursor-default mb-5 max-[800px]:text-5xl ' >404 :(</h1>
                    <h2 className='text-2xl cursor-default mb-2 font-bold max-[800px]:text-lg' >GO HOME, YOU'RE DRUNK!</h2>
                    <h3 className='mb-10 font-semibold max-[800px]:text-sm' >You are too drunk for the page. Just go home dude!</h3>
                    <NavLink to='/' className='p-4  border-solid border-2 border-gray-500 font-bold text-md hover:bg-zinc-100 max-[800px]:p-2 max-[800px]:text-sm' >BACK TO HOME</NavLink>
                </div>
            </motion.div>
        </Layout>
    )
}

export default PageNotFound