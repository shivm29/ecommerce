import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import useCategory from '../hooks/useCategory'
import axios from 'axios'
import { Link } from 'react-router-dom'


const CategoriesPage = () => {

    const categories = useCategory()


    return (
        <Layout title={"Categories | Vesh"} >
            <div className='flex min-w-full justify-center' >


                <div className='flex w-2/3 flex-wrap justify-center mt-10'  >
                    {categories?.map((c) => {
                        return (
                            <button key={c._id} className='py-2 w-60 border border-zinc-900 hover:bg-zinc-800 hover:text-zinc-200 transition ease-in-out duration-200 text-zinc-800 font-Nunito mr-2 mb-2 text-sm font-semibold ' >
                                <Link to={`/category/${c.slug}`} >{c.name}</Link>
                            </button>
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default CategoriesPage