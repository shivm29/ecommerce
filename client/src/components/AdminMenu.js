import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/adminpanel.css';

const AdminMenu = () => {
    const location = useLocation();

    return (
        <div
            className='flex box-border text-sm  flex-col p-10 pr-20  max-[1000px]:p-2 max-[1000px]:min-w-full '
        >

            <div className='' >
                <h1 className='font-semibold text-lg flex justify-end mb-6 mr-2  max-[1000px]:ml-2 max-[1000px]:text-xs '>Admin Panel</h1>
            </div>


            <div className='flex flex-col max-[1000px]:flex-row max-[1000px]:justify-around  max-[1000px]:min-w-full max-[1000px]:text-xs ' >

                <NavLink
                    to='/dashboard/admin'
                    className={`w-fit  mb-3 font-semibold text-zinc-600 cursor-pointer ${location.pathname === '/dashboard/admin' ? 'font-bold text-black underline underline-offset-8' : ''}`}
                >
                    Create Category
                </NavLink>
                <NavLink
                    to='/dashboard/admin/create-product'
                    className={`w-fit  mb-3 font-semibold text-zinc-600 cursor-pointer ${location.pathname === '/dashboard/admin/create-product' ? 'font-bold text-black underline underline-offset-8' : ''}`}
                >
                    Create Product
                </NavLink>
                <NavLink
                    to='/dashboard/admin/products'
                    className={`w-fit  mb-3 font-semibold text-zinc-600 cursor-pointer ${location.pathname === '/dashboard/admin/products' ? 'font-bold text-black underline underline-offset-8' : ''}`}
                >
                    Products
                </NavLink>
                <NavLink
                    to='/dashboard/admin/users'
                    className={`w-fit  mb-3 font-semibold text-zinc-600 cursor-pointer ${location.pathname === '/dashboard/admin/users' ? 'font-bold text-black underline underline-offset-8' : ''}`}
                >
                    Users
                </NavLink>




            </div>
        </div>
    );
}

export default AdminMenu;
