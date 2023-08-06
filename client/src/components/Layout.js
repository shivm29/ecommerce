import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {

    return (

        <div className=' text-zinc-600 dark:text-gray-300 dark:bg-zinc-900 ' >
            <Header  ></Header>

            <main className='min-h-screen font-Poppins '  >
                {children}
            </main>

            <Footer></Footer>

        </div>

    )
}

export default Layout