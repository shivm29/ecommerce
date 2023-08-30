import Layout from '../components/Layout'
import React from 'react'
import { useSearch } from '../context/Search'
import { Link } from 'react-router-dom'

const SearchPage = () => {

    const [values, setValues] = useSearch();
    console.log(values)

    return (
        <Layout>
            <div className='p-4 min-w-full flex flex-col items-center' >
                <h6 className='font-semibold mb-10' >
                    {
                        values?.results.length < 1 ? "No products found : (" : `${values?.results.length} Products Found `
                    }

                </h6>


                <div
                    initial={{ opacity: 0.5, y: '10%' }}
                    animate={{ opacity: 1, y: '0%' }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    exit={{ opacity: 0 }}
                    className='grid p-5 box-border min-w-full h-fit grid-cols-4 gap-2 max-[800px]:grid-cols-3 max-[600px]:grid-cols-2  mb-10 ' >
                    {
                        values?.results?.map((product) => {
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


            </div>
        </Layout>
    )
}

export default SearchPage