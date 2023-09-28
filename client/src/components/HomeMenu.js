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
        }
    }

    useEffect(() => {
        getAllcategories()
    }, [])


    return (
        <div className='max-[900px]:hidden  p-6 px-7 pr-12 w-fit h-fit sticky top-20 ' >
            <h2 className='font-bold text-zinc-900 font-Nunito mb-5' >Shop by Product</h2>

            <div className='flex flex-col' >
                {
                    categories?.map((c) => {
                        return (

                            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} className={` text-zinc-700 custom-checkbox ${checked.includes(c._id) ? 'underline underline-offset-8 font-semibold' : 'font-medium'} hover:font-bold font-Nunito mb-2  max-[1200px]:text-xs `} >
                                {c.name}
                            </Checkbox>
                        )
                    })
                }
            </div>

            <h2 className='font-bold text-zinc-900 font-Nunito mt-7 mb-5 ' >Trending Now</h2>
            <h3 className='text-zinc-700 text-sm mb-1  cursor-pointer hover:font-semibold max-[1200px]:text-xs' >Trending Now</h3>


            <h2 className='font-bold text-zinc-900 font-Nunito mt-7 mb-5' >Shop by Price</h2>

            <div>
                <Radio.Group className='flex flex-col custom-radio-group' onChange={e => setRadio(e.target.value)} >
                    {
                        Prices?.map((p) => (
                            <div key={p._id} className='mb-1' >

                                <Radio className={` text-zinc-700 custom-radio ${radio === p.array ? 'underline underline-offset-8 ' : 'font-medium'
                                    } hover:font-bold font-Nunito mb-2 max-[1200px]:text-xs`} value={p.array} > {p.name} </Radio>
                            </div>
                        ))
                    }
                </Radio.Group></div>


        </div>
    )
}

export default HomeMenu