import React from 'react'
import Dashboard from '../Dashboard'
import { useAuth } from '../../context/Auth'
const Profile = () => {

  const [auth] = useAuth();

  return (
    <Dashboard title={"Your profile"} >
      <div  >User profile</div>
    </Dashboard>
  )
}

export default Profile