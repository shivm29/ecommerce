import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
const Products = () => {

    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-product')

            if (data.success) {
                console.log("Data : ", data)
                setProducts(data.products)
            } else {
                // toast.error("Error in getting products")
            }

        } catch (error) {
            console.log("Error", error)
            // toast.error("Error in fetching products")
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <AdminDashboard>

            <motion.div
                initial={{ opacity: 0.5, y: '10%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                exit={{ opacity: 0 }}
                className=' border-t border-l border-zinc-500 grid p-5 box-border min-w-full h-fit grid-cols-4 gap-2 max-[800px]:grid-cols-3 max-[600px]:grid-cols-2  ' >
                {
                    products?.map((product) => {
                        return (
                            <div className='flex flex-col min-w-full  duration-100 mb-3' >
                                {/* product photo */}
                                <Link
                                    to={`/dashboard/admin/product/${product.slug}`}
                                >
                                    <img src={`/api/v1/product/product-photo/${product._id}`} alt="" />
                                </Link>
                                {/* product details */}
                                <div className='flex p-2 box-border mt-2 flex-col font-semibold' >
                                    <h2 className='text-sm max-[600px]:text-xs mb-1 truncate' >{product.name}</h2>
                                    <h2 className='text-sm mb-2 max-[600px]:text-xs ' >Rs. {product.price}</h2>
                                    <h2 className=' text-xs ' >New Arrival</h2>
                                </div>
                            </div>
                        )
                    })
                }
            </motion.div>

        </AdminDashboard>
    )
}

export default Products