import React, { useEffect, useState } from 'react'
import '../styles/loading.css'
import { useNavigate, useLocation } from 'react-router-dom'
import ReactLoading from 'react-loading';


const LoadingComponent = ({ path = '/login' }) => {

    const [count, setCount] = useState(5)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {

        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);

        }, 1000)
        count === 0 && navigate(`${path}`, {
            state: location.pathname
        })
        return () => clearInterval(interval)

    }, [count, navigate, location])

    return (
        <div className='min-h-screen flex  items-center justify-center min-w-full flex-col' >
            <div className='flex flex-col w-full items-center mt-10' >
                <ReactLoading type="bubbles" color="#242424"
                    height={70} width={70}
                /></div>
            <div className='font-Nunito text-xl font-semibold mb-5 text-zinc-600 max-[800px]:text-sm ' >Redirecting you to login page in {count} seconds</div>
            <div className='font-Nunito font-semibold max-[800px]:text-sm ' >Login to visit dashboard</div>
        </div>
    )
}

export default LoadingComponent