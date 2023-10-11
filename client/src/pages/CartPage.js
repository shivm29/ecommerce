import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useCart } from '../context/Cart'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Auth'
import TruncatedText from '../components/TruncatedText'
import DropIn from 'braintree-web-drop-in-react'
import axios from 'axios'
import { toast } from 'react-toastify'

const CartPage = () => {
    const [auth] = useAuth()
    const [cart, setCart] = useCart()
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()
    const [clientToken, setClientToken] = useState('')
    const [instance, setInstance] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (cart.length > 0) {
            getTotal()
        }
    }, [cart])


    const getTotal = () => {

        const ans = cart?.reduce((a, v) => a + parseInt(v.price), 0);
        if (!cart) ans = 0

        setTotal(ans);

    }




    const handleDelete = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            getTotal()
            localStorage.setItem("cart", JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }

    const getToken = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/braintree/token')
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    }


    const handlePayment = async () => {

        setLoading(true)
        localStorage.removeItem("cart")
        setCart([])
        navigate('/dashboard/user/orders')
        toast.success("Payment completed Successfully")
        setLoading(false)
    }


    useEffect(() => {
        getToken()
    }, [auth?.token])



    console.log("cart, ", cart)
    return (
        <Layout title={"Cart | Vesh"} >
            <div className='flex min-w-full flex-col items-center box-border min-[800px]:pl-20' >
                <h1 className='text-3xl  mt-5 font-medium w-full border-zinc-300 flex justify-center max-[800px]:font-semibold max-[800px]:text-lg' >Shopping Bag</h1>
                <h3 className='mt-3 mb-5 text-sm font-medium flex justify-end' >You have {cart?.length} items in your cart</h3>

                <div className='flex max-[800px]:flex-col mt-10 w-full max-[1200px]:w-full max-[1200px]:px-4 justify-center' >
                    <div className=' flex flex-1 flex-col bg-white max-[800px]:mb-5 mb-10' >
                        {
                            cart?.length < 1 ? (
                                <h1 className='text-lg font-bold border p-10 box-border justify-center flex max-[800px]:text-sm max-[800px]:font-semibold' >Your Cart is Empty </h1>
                            ) : (
                                <>
                                    {
                                        cart?.map((c) => {
                                            return (

                                                <div key={c._id} className='flex min-w-full p-4 border my-1' >
                                                    <Link to={`/product/${c.slug}`} >
                                                        <div className='flex items-center mr-2' >
                                                            <img
                                                                className='h-52'
                                                                src={`/api/v1/product/product-photo/${c._id}`} alt="" />
                                                        </div>
                                                    </Link>
                                                    <div className='flex flex-col flex-1 p-3 text-base  justify-between max-[800px]:text-sm ' >

                                                        <div>
                                                            <h2 className='font-semibold max-[800px]:mb-2' > {c.name} </h2>
                                                            <h2 className='font-semibold ' > $ {c.price} </h2>
                                                            <h2 className='font-medium mt-3 max-[800px]:text-xs ' >{c.category.name} </h2>

                                                        </div>

                                                        <div className='flex flex-1'>
                                                            <p className='max-w-full max-[800px]:text-xs mt-3 text-sm ' > {c.description}</p>

                                                        </div>

                                                        <div className='w-full flex justify-end mt-2 text-xs ' >
                                                            <button className='' onClick={() => handleDelete(c._id)} ><img src="/images/delete.png" className='h-5 opacity-60 z-50' alt="" /></button>
                                                        </div>

                                                    </div>


                                                </div>

                                            )
                                        })
                                    }
                                </>
                            )
                        }
                    </div>
                    <div className='flex  flex-1 justify-center min-[800px]:ml-2 max-[800px]:justify-center' >

                        <div className='flex-col p-5 w-5/6 max-w-lg max-[800px]:w-full max-[800px]:max-w-xl border items-center max-[800px]:mb-10' >
                            <h3 className='flex w-full justify-between font-semibold text-xs' > Discounts <span className='font-semibold  underline underline-offset-4 cursor-pointer' >Apply Discount</span> </h3>



                            {
                                !auth?.user && (

                                    <>
                                        <h3 className='place-self-start font-medium text-sm mt-3' >Login to use your personal offers</h3>

                                        <button onClick={() => navigate('/login', {
                                            state: '/cart'
                                        })} className='p-3 w-full  transition ease-in-out duration-100 border border-black font-semibold text-sm mt-5 max-[800px]:text-xs' >Log in</button></>

                                )
                            }

                            <div className='w-full border-t mt-4 py-4 font-Nunito ' >

                                {
                                    cart?.length > 0 && (
                                        <div>
                                            <h1 className='flex justify-between w-full text-sm font-medium text-zinc-500 max-[800px]:text-xs' >Order Value <span className='text-zinc-800 font-semibold' >$ {total}.00 </span>
                                            </h1>
                                            <h1 className='flex justify-between w-full text-sm font-medium text-zinc-500 mt-2 border-b pb-3 border-zinc-600 max-[800px]:text-xs' >Delivery <span className='text-zinc-800 font-semibold' >$ 4</span>
                                            </h1>
                                        </div>
                                    )
                                }

                                <h1 className='flex mt-3 justify-between w-full text-md font-semibold text-zinc-800 max-[800px]:text-sm' >Total <span className='text-zinc-800 font-semibold' >$ {cart.length > 0 ? total + 4 + '.00' : '0.00'} </span>
                                </h1>

                            </div>

                            {/* <button className={`p-3 text-sm bg-zinc-900 text-zinc-200 w-full  transition ease-in-out duration-100 border border-black font-semibold mt-5 max-[800px]:text-xs ${cart?.length || !auth?.user === 0 ? ' cursor-not-allowed ' : ''} `} >Continue to Checkout</button> */}

                            {
                                auth?.user && (
                                    <div className='flex flex-col min-w-full py-2 ' >
                                        <h2 className='text-xs font-medium mt-3' >Deliver to {auth?.user?.address} </h2>

                                        <button className='p-3 text-sm  text-zinc-600 w-full  transition ease-in-out duration-100 border border-black font-semibold mt-5 max-[800px]:text-xs' > <Link to='/dashboard/user/profile' >Change address</Link> </button>
                                    </div>
                                )
                            }


                            <div className='flex flex-col py-4' >


                                {
                                    !auth?.user && (
                                        <>
                                            <h3 className='text-xs font-medium ' >We accept</h3>
                                            <div className='flex flex-wrap w-2/3 text-xs py-2 font-semibold items-center max-[800px]:font-medium
                                ' >
                                                <span className='mb-2 mr-2'>Cash on Delivery</span>

                                                <span><img className='h-9 mr-4 mb-2' src="/images/mastercard.png" alt="" /></span>
                                                <span><img className='h-9 mr-4 mb-2' src="/images/visa.png" alt="" /></span>
                                                <span><img className='h-9 mr-4 mb-2' src="/images/rupay.png" alt="" /></span>

                                                <span className='mb-2 mr-4 font-bold'>EMI</span>

                                                <span><img className='h-3 mr-4 mb-2' src="/images/UPI.png" alt="" /></span>

                                            </div>

                                        </>
                                    )
                                }



                                <div className='flex min-w-full flex-col' >
                                    {auth?.user && clientToken && cart.length > 0 && (
                                        <>
                                            <DropIn
                                                className='font-Nunito'
                                                options={{
                                                    authorization: clientToken,

                                                }}

                                                onInstance={(instance) => setInstance(instance)}
                                            />


                                        </>
                                    )}


                                    <button
                                        // disabled={loading || !instance || !auth?.user?.address}
                                        disabled
                                        onClick={handlePayment} className={`p-3 text-sm bg-zinc-900 text-zinc-200 w-full  transition ease-in-out duration-100 border border-black font-semibold mt-5 max-[800px]:text-xs cursor-not-allowed`} >
                                        {loading ? 'Loading...' : 'Make Payment'}

                                    </button>


                                </div>

                                <div className='font-Nunito text-xs mt-3 font-medium text-zinc-500 max-[800px]:font-normal' >
                                    Prices and delivery costs are not confirmed until you've reached the checkout.
                                    <br />
                                    <br />
                                    15 days free return
                                    <br />
                                    <br />
                                    Customers would receive an SMS/WhatsApp notifications regarding deliveries on the registered phone number

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default CartPage 