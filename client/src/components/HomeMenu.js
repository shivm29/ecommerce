import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Checkbox from 'antd/es/checkbox/Checkbox'
import { Radio } from 'antd'
import { Prices } from './Prices'
import '../styles/HomeMEnu.css'

const HomeMenu = ({ checked, handleFilter, setRadio, radio }) => {
    const [categories, setCategories] = useState([])
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

    useEffect(() => {
        getAllcategories()
    }, [])

    // console.log("checked", radio)

    return (
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


        </div>
    )
}

export default HomeMenu