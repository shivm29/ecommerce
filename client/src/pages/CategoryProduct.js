import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const CategoryProduct = () => {

    const params = useParams()
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState()

    const getProductByCategory = async () => {
        try {

            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)

            setProducts(data?.products)
            setCategory(data?.category)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (params?.slug) getProductByCategory()
    }, [params?.slug])

    return (
        <Layout>
            <h1 className='w-full text-2xl flex justify-center mt-2 font-medium' > {category?.name} </h1>
            <h2 className='w-full text-sm flex justify-center mt-2 mb-2  font-medium' > {products?.length} Results Found </h2>



            <div
                className='grid p-5 box-border min-w-full h-fit grid-cols-4 gap-2 max-[1200px]:grid-cols-3 max-[900px]:grid-cols-2  ' >
                {
                    products?.map((product) => {
                        return (
                            <div key={product._id} className='flex flex-col min-w-full  duration-100 mb-3' >
                                {/* product photo */}
                                <Link
                                    to={`/product/${product.slug}`}
                                >
                                    <img src={`/api/v1/product/product-photo/${product._id}`} alt="" />
                                </Link>
                                {/* product details */}
                                <div className='flex p-2 box-border mt-2 flex-col font-semibold' >
                                    <h2 className='text-sm max-[600px]:text-xs mb-1 truncate' >{product.name}</h2>
                                    <h2 className='text-sm mb-2 max-[600px]:text-xs ' >Rs. {product.price}</h2>

                                    <h2 className=' text-xs flex justify-between items-center w-full ' >New Arrival
                                    </h2>
                                </div>
                            </div>
                        )
                    })
                }
            </div>


        </Layout>
    )
}

export default CategoryProduct