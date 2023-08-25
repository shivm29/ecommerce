import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/adminpanel.css';

const AdminMenu = () => {
    const location = useLocation();

    return (
        <div
            className='flex flex-col max-[1000px]:min-w-full border mt-10 rounded-md bg-white ml-5 text-sm  p-4 px-10  pt-5 drop-shadow-sm box-border w-fit max-[1000px]:ml-0  max-[1000px]:py-0  max-[1000px]:drop-shadow-none  max-[1000px]:border-none  max-[1000px]:pb-3   max-[1000px]:pt-0  custom-div '
        >

            <div className='flex' >
                <h1 className='font-semibold text-lg mb-5 flex justify-center  max-[1000px]:ml-2 max-[1000px]:text-sm '>Admin Panel</h1>
            </div>


            <div className='max-[1000px]:min-w-full max-[1000px]:flex max-[1000px]:justify-center max-[1000px]:px-2 box-border  max-[1000px]:border-b  max-[1000px]:pb-2' >
                <NavLink
                    to='/dashboard/admin/create-category'
                    className={`border font-normal flex justify-center rounded-lg p-2 px-5 my-2  ${location.pathname === '/dashboard/admin/create-category' ? ' bg-gradient-to-r from-pink-500 via-fuchsia-600 to-fuchsia-700  text-zinc-100 opacity-75' : 'text-zinc-500'
                        } max-[1000px]:mx-1  max-[1000px]:p-2 max-[1000px]:px-3 hover:scale-95 duration-100 max-[1000px]:font-normal max-[1000px]:items-center max-[1000px]:text-xs `}
                >
                    Create Category
                </NavLink>


                <NavLink
                    to='/dashboard/admin/create-product'
                    className={`border flex justify-center rounded-lg p-2 px-5 my-2  ${location.pathname === '/dashboard/admin/create-product' ? ' bg-gradient-to-r from-pink-500 via-fuchsia-600 to-fuchsia-700 opacity-75 text-zinc-100' : 'text-zinc-500'
                        } max-[1000px]:mx-1  max-[1000px]:p-0 max-[1000px]:px-2  hover:scale-95 duration-100   max-[1000px]:font-normal max-[1000px]:items-center max-[1000px]:text-xs  `}
                >
                    Create Product
                </NavLink>


                <NavLink
                    to='/dashboard/admin/users'
                    className={`border flex justify-center rounded-lg p-2 px-5 my-2  ${location.pathname === '/dashboard/admin/users' ? 'opacity-70 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-fuchsia-700  text-slate-100' : 'text-zinc-500'
                        } max-[1000px]:mx-1  max-[1000px]:p-0 max-[1000px]:px-2  hover:scale-95 duration-100  max-[1000px]:font-normal max-[1000px]:items-center max-[1000px]:text-xs  `}
                >
                    Users
                </NavLink></div>
        </div>
    );
}

export default AdminMenu;
