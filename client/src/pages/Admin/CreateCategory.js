import React from 'react'
import AdminDashboard from './AdminDashboard'
import { motion } from 'framer-motion'

const CreateCategory = () => {
    return (
        <AdminDashboard>
            <motion.div initial={{ opacity: 0.5, y: '5%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                exit={{ opacity: 0 }} >
                {/* create category */}
            </motion.div>
        </AdminDashboard>
    )
}

export default CreateCategory