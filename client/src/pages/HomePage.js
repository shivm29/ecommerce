import React from 'react'
import Layout from '../components/Layout'
import PickSomething from '../components/PickSomething'
import { useAuth } from '../context/Auth'
import { motion } from 'framer-motion'

const HomePage = () => {


  const [auth, setAuth] = useAuth()

  return (
    <Layout title={'Shop now - ShopCart | Home'} >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: 'easeIn' }}
        exit={{ opacity: 0 }} >

        {/* <PickSomething /> */}
        <pre className=' overflow-x-hidden ' > {JSON.stringify(auth, null, 4)} </pre>
      </motion.div>
    </Layout>
  )
}

export default HomePage