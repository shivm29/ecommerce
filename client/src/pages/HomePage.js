import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import HomeMenu from '../components/HomeMenu'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Checkbox from 'antd/es/checkbox/Checkbox'
import { Radio } from 'antd'
import '../styles/HomeMEnu.css'
import '../styles/Homepage.css'
import { Prices } from '../components/Prices'
import PickSomething from '../components/PickSomething'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ReactLoading from 'react-loading';



const HomePage = () => {

  const [products, setProducts] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [categories, setCategories] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [showPrices, setShowPrices] = useState(false)
  const [applyingFilter, setApplyingFilter] = useState(false)

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
    setApplyingFilter(true);
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
      if (checked.length === 0 && radio.length === 0) {
        // If no checkboxes or radio options are selected, display all products
        getAllProducts();
      } else {
        // Filter products based on checked checkboxes and radio options
        const { data } = await axios.post("/api/v1/product/product-filters", {
          checked,
          radio,
        });
        setProducts(data?.products);
      }

      setApplyingFilter(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    filterProduct();
  }, [checked, radio]);


  useEffect(() => {
    getAllcategories()
    getTotal()
    getAllProducts()
  }, [])

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  console.log("checked", checked)
  console.log("radio", radio)

  // useEffect(() => {
  //   if (!checked.length || !radio.length) getAllProducts();
  // }, [checked.length, radio.length]);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


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
          <HomeMenu checked={checked} radio={radio} setRadio={setRadio} setChecked={setChecked} handleFilter={handleFilter} />
          {/* Products */}

          <div className='flex flex-col flex-1 ' >

            <div className='flex flex-col h-10  w-full  justify-between max-[800px]:max-h-64' id='background' >
              <h1 className='flex p-4 mt-2 h-1/2 items-end text-5xl font-bold ml-10 max-[800px]:text-5xl max-[800px]:pb-10  ' >Vesh 50% Sale!</h1>
              <div className='flex w-full justify-end' >
                <button className='p-3 text-sm font-bold max-[800px]:font-semibold mr-10 mb-10 bg-zinc-800 text-zinc-100 max-[800px]:text-xs' >Shop Now</button>
              </div>
            </div>

            <div className='min-[800px]:hidden w-full px-2 pt-4 relative flex text-xs' >

              <button className="flex items-center text-xxs p-2 pb-0 font-medium tracking-widest text-zinc-950 " onClick={() => setShowFilters(!showFilters)}

              > CATEGORY <img src="/images/down-arrow.png" className='h-2 ml-2' alt="" /> </button>
              <button className="flex items-center text-xxs p-2 pb-0 font-medium tracking-widest text-zinc-950 " onClick={() => setShowPrices(!showPrices)}

              > PRICE<img src="/images/down-arrow.png" className='h-2 ml-2' alt="" /> </button>

              <div className={` ${showFilters ? 'block' : 'hidden'} bg-white  w-48  text-sm ml-2 font-medium py-2 top-10  absolute dropdown-content overflow-auto pb-6 filter-dropdown ${showFilters ? 'open' : ''}`} >
                <h2 className='mb-3 text-xs bg-slate-100 pl-4 py-2.5' > By Category</h2>
                <div className='flex flex-col' >
                  {
                    categories?.map((c) => {
                      return (

                        <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} onClick={() => setShowFilters(false)} className={`pl-2 text-zinc-700 custom-checkbox ${checked.includes(c._id) ? 'underline underline-offset-8 font-semibold' : 'font-medium'} hover:font-bold font-Nunito mb-3  max-[1200px]:text-xs `} >
                          {c.name}
                        </Checkbox>
                      )
                    })
                  }
                </div>



              </div>
              <div className={` ${showPrices ? 'block' : 'hidden'} bg-white  w-48  text-sm ml-28 font-medium py-2 top-10  absolute dropdown-content overflow-auto pb-6 filter-dropdown ${showPrices ? 'open' : ''}`} >
                <h2 className='mb-3 text-xs bg-slate-100 pl-4 py-2.5' > By Prices</h2>
                <div className='flex flex-col' >
                  {
                    Prices?.map((p) => {
                      return (

                        <Radio className={` text-zinc-700 custom-radio ${radio === p.array ? 'underline underline-offset-8 ' : 'font-medium'
                          } hover:font-bold font-Nunito mb-2 max-[1200px]:text-xs`} value={p.array} > {p.name} </Radio>
                      )
                    })
                  }
                </div>

              </div>

            </div>
            <PickSomething />
            {applyingFilter ? (
              <div className='flex flex-col w-full items-center mt-10' >
                <ReactLoading type="bubbles" color="#242424"
                  height={70} width={70}
                />

                <p>Applying Filters ..</p>
              </div>) : (
              <motion.div
                initial={{ opacity: 0.5, y: '10%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                exit={{ opacity: 0 }}
                className='grid mt-3 box-border min-w-full h-fit grid-cols-5 gap-2 max-[1200px]:grid-cols-3 max-[900px]:grid-cols-2 max-[800px]:p-2 max-[800px]:gap-1 ' >
                {
                  products?.map((product) => {
                    return (
                      <div key={product._id} className='text-zinc-800 flex flex-col min-w-full  duration-100 mb-3' >
                        {/* product photo */}
                        <Link
                          onClick={goTop}
                          to={`/product/${product.slug}`}
                        >
                          <LazyLoadImage
                            effect='blur'
                            src={`/api/v1/product/product-photo/${product._id}`}
                          />
                        </Link>
                        {/* product details */}
                        <div className='flex p-2 box-border mt-2 flex-col text-zinc-950 ' >
                          <h2 className='text-sm max-[600px]:text-xs mb-1 truncate' >{product.name}</h2>
                          <h2 className='text-sm mb-2 max-[600px]:text-xs ' >$ {product.price}</h2>

                          <h2 className=' text-xs flex justify-between items-center w-full ' >New Arrival
                          </h2>
                        </div>
                      </div>
                    )
                  })
                }
              </motion.div>
            )}
          </div>


        </div>
        <div className='flex min-w-full justify-center' >
          {
            checked.length === 0 && radio.length === 0 && products && products.length < total && (
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