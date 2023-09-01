import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/adminpanel.css';

const UserMenu = () => {
    const location = useLocation();

    return (
        <div
            className='flex box-border text-sm  flex-col p-10 pr-20  max-[1000px]:p-2 max-[1000px]:min-w-full '>

            <div className='' >
                <h1 className='font-semibold text-lg flex justify-center mb-6 mr-2  max-[1000px]:ml-2 max-[1000px]:text-sm max-[1000px]:my-4 '>User Panel</h1>
            </div>



            <div className='flex flex-col max-[1000px]:flex-row max-[1000px]:justify-around  max-[1000px]:min-w-full max-[1000px]:text-xs' >
                <NavLink
                    to='/dashboard/user/profile'
                    className={`w-fit  mb-3 font-semibold text-zinc-600 cursor-pointer ${location.pathname === '/dashboard/user/profile' ? 'font-bold text-black underline underline-offset-8' : ''}`}
                >
                    Profile
                </NavLink>


                <NavLink
                    to='/dashboard/user/orders'
                    className={`w-fit  mb-3 font-semibold text-zinc-600 cursor-pointer ${location.pathname === '/dashboard/user/orders' ? 'font-bold text-black underline underline-offset-8' : ''}`}
                >
                    Orders
                </NavLink></div>
        </div>
    );
}

export default UserMenu;
