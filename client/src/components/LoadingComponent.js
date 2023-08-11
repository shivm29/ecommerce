import React, { useEffect, useState } from 'react'
import '../styles/loading.css'
import { useNavigate, useLocation } from 'react-router-dom'

const LoadingComponent = () => {

    const [count, setCount] = useState(5)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {

        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);

        }, 1000)
        count === 0 && navigate('/login', {
            state: location.pathname
        })
        return () => clearInterval(interval)

    }, [count, navigate, location])

    return (
        <div className='min-h-screen flex  items-center justify-center min-w-full flex-col' >
            <section className="paytm-loader mb-10"></section>
            <div className='font-Nunito text-xl font-semibold mb-20 text-zinc-600 ' >Redirecting you to login page in {count} seconds</div>
            <div className='font-Nunito font-semibold text-pink-500  ' >Login to visit dashboard</div>
        </div>
    )
}

export default LoadingComponent