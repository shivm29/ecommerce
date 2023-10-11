import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useCart } from '../context/Cart'
import { toast } from 'react-toastify'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductDetails = () => {

    const params = useParams()
    const [product, setProduct] = useState({})
    const [showFit, setShowFit] = useState(true)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [cart, setCart] = useCart()

    useEffect(() => {
        if (params?.slug) {
            getProduct()
        }
    }, [params?.slug])

    const goTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };


    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/get-product/${params.slug}`
            );
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };
    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            console.log("cid", cid, "pid", pid)
            const { data } = await axios.get(
                `/api/v1/product/related-product/${pid}/${cid}`
            );
            console.log("data :: ", data)
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    console.log("related : ", relatedProducts)

    const handleAddToCart = (product) => {

        if (cart?.filter(item => item === product).length > 0) {
            toast.success("Already added to cart")
        } else {
            setCart([...cart, product]);
            toast.success("Added to cart")
            localStorage.setItem('cart', JSON.stringify([...cart, product]))
        }

    }

    return (
        <Layout title={'Vesh'}>

            <div className='flex flex-col min-w-full items-center min-h-full ' >
                <div className='h-2/3 grid grid-cols-2 w-2/3 max-[1400px]:w-5/6 max-[1000px]:w-full max-[1000px]:px-4 gap-8  max-[800px]:flex max-[800px]:flex-col '  >

                    {/* product image */}
                    <div className='flex max-[800px]:justify-center' ><LazyLoadImage effect='blur' src={`/api/v1/product/product-photo/${product?._id}`} alt="" className=' object-cover' /></div>

                    {/* product details */}
                    <div className='flex flex-col box-border  max-[800px]:p-0 py-10 justify-between' >

                        <div className='flex flex-col ' >
                            <h2 className='font-semibold max-[800px]:text-sm flex justify-between items-center' > {product?.name}

                                <img src="/images/bag.png" className='h-6 max-[800px]:h-4 opacity-70
                                ' alt="" />
                            </h2>

                            <h2 className='font-semibold text-2xl max-[800px]:text-base mt-3' > $ {product?.price} </h2>

                            <div className='flex flex-wrap mt-6  max-[800px]:my-6 max-[800px]:text-xs mb-16' >

                                <button className='py-2 w-24 font-semibold mr-1 mb-2 box-border border  ' >XS</button>
                                <button className='py-2 w-24 font-semibold mr-1 mb-2 box-border border' >S</button>
                                <button className='py-2 w-24 font-semibold mr-1 mb-2 box-border border' >M</button>
                                <button className='py-2 w-24 font-semibold mr-1 mb-2 box-border border' >L</button>
                                <button className='py-2 w-24 font-semibold mr-1 mb-2 box-border border' >XL</button>
                                <button className='py-2 w-24 font-semibold mr-1 mb-2 box-border border' >XXL</button>

                            </div>
                        </div>

                        <div className='flex flex-col' >
                            <h2 className='my-3 text-sm max-[800px]:text-xs max-[800px]:mt-0 ' > {product?.description} </h2>

                            <h3 className='mt-3 flex items-center text-sm max-[800px]:text-xs font-semibold ' > <img src="/images/info.png" alt="" className='h-4 mr-2  max-[800px]:h-3 ' /> Standard delivery in 2-7 days
                            </h3>
                            <h3 className='mt-3 flex items-center text-sm font-semibold cursor-pointer  max-[800px]:text-xs' >Delivery and Payment
                            </h3>

                            <button onClick={() => {
                                handleAddToCart(product)
                            }

                            } className='w-full flex justify-center p-4 mt-6 bg-zinc-800 hover:bg-zinc-700  transition ease-in-out duration-200   text-zinc-200 font-semibold  max-[800px]:text-xs' >
                                <img src="/images/whitebag.png" className='h-6 mr-2  max-[800px]:h-4 ' alt="" />
                                Add</button>

                            <div className='w-full flex mt-6 items-center font-semibold py-4 border-y border-zinc-300 flex-col ' >
                                <button className=' max-[800px]:text-xs' onClick={() => setShowFit(!showFit)} >Description & Fit</button>
                                {
                                    showFit && (
                                        <div className='mt-5 font-normal text-sm transition ease-in-out duration-100  max-[800px]:text-xs ' > {product?.fit} </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col  min-w-full box-border px-10 my-12 max-[900px]:px-2' >
                    <h2 className='flex w-full justify-end border-b border-zinc-300 py-2 max-[900px]:border-none  max-[900px]:text-sm   max-[900px]:justify-center ' >

                        {
                            relatedProducts.length < 1 ? 'No Similar Products' : 'Similar Products'
                        }
                    </h2>

                    <div className='grid grid-cols-4 min-w-full mt-12   max-[1200px]:grid-cols-3 max-[900px]:grid-cols-2' >
                        {
                            relatedProducts?.map((product) => {
                                return (
                                    <div key={product._id} className='flex flex-col min-w-full  duration-100 mb-3' >
                                        {/* product photo */}
                                        <Link
                                            onClick={goTop}
                                            to={`/product/${product.slug}`}
                                        >
                                            <img src={`/api/v1/product/product-photo/${product._id}`} alt="" />
                                        </Link>
                                        {/* product details */}
                                        <div className='flex p-2 box-border mt-2 flex-col font-semibold' >
                                            <h2 className='text-sm max-[600px]:text-xs mb-1 truncate' >{product.name}</h2>
                                            <h2 className='text-sm mb-2 max-[600px]:text-xs ' >$ {product.price}</h2>

                                            <h2 className=' text-xs flex justify-between items-center w-full ' >New Arrival
                                            </h2>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>

        </Layout>
    )
}

export default ProductDetails