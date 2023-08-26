import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import PickSomething from '../components/PickSomething'
import { useAuth } from '../context/Auth'
import { motion } from 'framer-motion'
import HomeMenu from '../components/HomeMenu'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Checkbox from 'antd/es/checkbox/Checkbox'
import { Radio } from 'antd'
import { Prices } from '../components/Prices'
import '../styles/HomeMEnu.css'


const HomePage = () => {

  const [products, setProducts] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [categories, setCategories] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(1)


  // load more


  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/product-count')
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  // get all categories
  const getAllcategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category')
      if (data.success) {
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error)
      // toast.error('Something went wrong in getting categories')
    }
  }

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      if (data.success) {
        console.log("Data : ", data)
        setProducts(data?.products)
      } else {
        setLoading(false)
        // toast.error("Error in getting products")
      }

    } catch (error) {
      console.log("Error", error)
      // toast.error("Error in fetching products")
    }
  }

  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }

    setChecked(all)
  }

  // get filtered products : 
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getAllcategories()
    getTotal()
  }, [])

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  console.log("checked", checked)
  console.log("radio", radio)

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={'Shop now - ShopCart | Home'} >
      <motion.div
        initial={{ opacity: 0.5, y: '20%' }}
        animate={{ opacity: 1, y: '0%' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        exit={{ opacity: 0 }} >

        <div className='flex w-full min-h-screen' >


          {/* <HomeMenu checked={checked} radio={radio} setRadio={setRadio} setChecked={setChecked} handleFilter={handleFilter} /> */}

          <div className='p-6 px-7 pr-12 w-fit w-56' >
            <h2 className='font-bold text-zinc-900 font-Nunito mb-5' >Shop by Product</h2>

            <div className='flex flex-col' >
              {
                categories?.map((c) => {
                  return (

                    <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} className={`font-semibold text-zinc-700 custom-checkbox ${checked.includes(c._id) ? 'underline underline-offset-8 font-semibold' : ''} hover:font-bold font-Nunito mb-2 `} >
                      {c.name}
                    </Checkbox>
                  )
                })
              }
            </div>

            <h2 className='font-bold text-zinc-900 font-Nunito mt-7 mb-5 ' >Trending Now</h2>
            <h3 className='text-zinc-700 text-sm mb-1 font-semibold cursor-pointer hover:font-semibold ' >Trending Now</h3>


            <h2 className='font-bold text-zinc-900 font-Nunito mt-7 mb-5' >Shop by Price</h2>

            <div>
              <Radio.Group className='flex flex-col custom-radio-group' onChange={e => setRadio(e.target.value)} >
                {
                  Prices?.map((p) => (
                    <div key={p._id} className='mb-1' >

                      <Radio className={`font-semibold text-zinc-700 custom-radio ${radio === p.array ? 'underline underline-offset-8 ' : ''
                        } hover:font-bold font-Nunito mb-2 `} value={p.array} > {p.name} </Radio>
                    </div>
                  ))
                }
              </Radio.Group></div>
            <button className='font-semibold font-Nunito text-sm mt-3' onClick={() => window.location.reload()} >Reset Filters {total} </button>

          </div>

          {/* Products */}
          <div className='flex flex-1 ' >
            <motion.div
              initial={{ opacity: 0.5, y: '10%' }}
              animate={{ opacity: 1, y: '0%' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              exit={{ opacity: 0 }}
              className='grid p-5 box-border min-w-full h-fit grid-cols-4 gap-2 max-[800px]:grid-cols-3 max-[600px]:grid-cols-2  ' >
              {
                products?.map((product) => {
                  return (
                    <div key={product._id} className='flex flex-col min-w-full  duration-100 mb-3' >
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

                        <h2 className=' text-xs flex justify-between items-center w-full ' >New Arrival
                        </h2>
                      </div>
                    </div>
                  )
                })
              }
            </motion.div>
          </div>


        </div>
        <div className='flex min-w-full justify-center' >
          {
            products && products.length < total && (
              <button className='border-2 border-zinc-600 p-2 px-6 font-bold my-10 text-zinc-600 hover:bg-zinc-900  hover:text-white transition ease-in-out duration-200  text-sm '
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? 'Loading ...' : 'Load More'}
              </button>

            )
          }
        </div>
      </motion.div>
    </Layout >
  )
}

export default HomePage