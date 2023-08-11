import React from 'react'
import '../styles/Dropdown.css'
const DropDown = () => {
    return (
        <div className='flex flex-col dropDownProfile' >
            <ul className='flex flex-col gap-4' >
                <li>Dashboard</li>
                <li>Logout</li>
            </ul>
        </div>
    )
}

export default DropDown