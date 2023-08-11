import { useState, useEffect } from 'react'
import { useAuth } from '../../context/Auth'
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import LoadingComponent from '../LoadingComponent';

export default function PrivateRoute() {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()

    useEffect(() => {

        // Confirms if the token provided is correct and user is signedIn or not. If signed in ok = true else false
        const authCheck = async () => {
            const res = await axios.get('/api/v1/auth/user-auth')

            if (res.data.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        }

        // checks if the user is logged in | if yes it will call authCheck()
        if (auth?.token) authCheck();
    }, [auth?.token])

    return ok ? <Outlet /> : <LoadingComponent />
}