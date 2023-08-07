import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet";


const Layout = ({ children, title, description, keywords, author }) => {

    return (

        <div className=' text-zinc-600 dark:text-gray-300 dark:bg-zinc-900 ' >
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>

                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />

            </Helmet>
            <Header  ></Header>

            <main className=' font-Nunito ' style={{ minHeight: '90vh' }} >
                {children}
            </main>

            <Footer></Footer>

        </div>

    )
}

Layout.defaultProps = {
    title: 'ShopCart',
    description: 'MERN stack app',
    keywords: 'mern, react, node, mongodb, express, redux, tailwind, payment gateways',
    author: 'shivm-dev'

}

export default Layout