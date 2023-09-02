import React from 'react'
import AdminDashboard from './AdminDashboard'
const User = () => {
    return (
        <AdminDashboard>
            <div className='box-border pb-20 flex min-w-full h-screen border-l border-t justify-center items-center border-zinc-500 max-[800px]:items-start' >
                <h1 className='mb-24 max-[800px]:mt-20 font-Nunito text-lg font-medium text-zinc-500 max-[800px]:text-sm' >No Users found</h1>
            </div>
        </AdminDashboard>
    )
}

export default User