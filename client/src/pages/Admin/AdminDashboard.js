import React from 'react'
import Layout from '../../components/Layout.js'
import AdminMenu from '../../components/AdminMenu.js'
const AdminDashboard = ({ children }) => {
    return (
        <Layout title={'Admin Dashboard - ShopCart'}  >

            <div
                className='flex max-[1000px]:flex-col min-w-full min-h-screen ' >
                <AdminMenu />
                <div className='flex flex-1   min-h-screen' >
                    {children}
                </div>
            </div>

        </Layout>
    )
}

export default AdminDashboard