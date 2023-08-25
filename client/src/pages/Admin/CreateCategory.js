import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
const CreateCategory = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [editedCategory, setEditedCategory] = useState(null);
    const [editedCategoryName, setEditedCategoryName] = useState("");


    const handleEdit = (c) => {
        console.log(c.name)
        setEditedCategory(c.name)
        setEditedCategoryName(c.name)
    }

    const handleUpdate = async (c) => {
        try {
            // setEditedCategory(null)
            console.log(editedCategoryName)
            console.log(c._id)
            const { data } = await axios.put(`/api/v1/category/update-category/${c._id}`, { name: editedCategoryName })
            if (data.success) {
                toast.success("Category Updated Successfully")
            } else {
                toast.error("Error in updating category")
            }

            getAllcategories()
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong while updaing..")
        }
    }

    const handleDelete = async (c) => {
        try {
            console.log("delete : ", c.slug)
            const { data } = await axios.delete(`/api/v1/category/delete-category/${c.slug}`)
            if (data.success) {
                toast.success("Category deleted sucessfully")
            }
            else {
                toast.error("error in deleting category")
            }

            getAllcategories()

        } catch (error) {
            console.log("Error", error);
            toast.error("Something went wrong while deleting..")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/category/create-category', { name })
            if (data.success) {
                toast.success(`${name} added`)
                getAllcategories()
                setName("")
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Error in submitting new category")
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

    useEffect(() => {
        getAllcategories()
    }, [])

    console.log(categories)
    return (
        <AdminDashboard>
            <motion.div initial={{ opacity: 0.5, y: '5%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                exit={{ opacity: 0 }} >
                {/* create category */}
            </motion.div>

            <motion.div
                initial={{ opacity: 0.5, y: '5%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                exit={{ opacity: 0 }}

                className='box-border p-5 min-h-screen min-w-full flex flex-col justify-start items-center' >

                <CategoryForm name={name} setName={setName} handleSubmit={handleSubmit} />

                <div className='min-w-full h-fit mt-6 flex flex-col justify-center items-center  ' >
                    <div className='flex w-2/3 max-[1000px]:w-full h-fit justify-start items-center border-b-2 border-zinc-400 box-border p-2 pb-4 shadow-sm mb-3 ' >
                        <div className='flex h-full flex-1 font-semibold text-zinc-500 justify-center border-r-2 border-zinc-400 ' >Categories</div>
                        <div className='flex h-full flex-1 font-semibold text-zinc-500 justify-center ' >Actions</div>
                    </div>

                    <div className='flex flex-col min-w-full min-h-fit justify-center items-center mt-2 p-2 box-border font-semibold ' >
                        {
                            categories?.map((c, key) => {
                                return (
                                    <div key={key} className='flex w-2/3 max-[1000px]:w-full h-fit justify-between items-center box-border text-sm max-[1000px]:text-xs mb-3  rounded-lg p-1 px-4 ' >

                                        {
                                            editedCategory === c.name ? (
                                                <input
                                                    type="text"
                                                    value={editedCategoryName}
                                                    className='pb-1 text-zinc-500 border-b outline-none w-72 max-[1000px]:w-40'
                                                    onChange={(e) => setEditedCategoryName(e.target.value)}

                                                />

                                            ) : (<div className='flex h-full flex-1 items-center '>{c.name}</div>)
                                        }
                                        {/* <div className='border-b border-dashed border-zinc-300 h-0 flex-grow max-[1000px]:hidden ' ></div> */}

                                        {
                                            editedCategory === c.name ? (
                                                <div className='flex h-full flex-1 justify-end box-border pr-2' >
                                                    <button className='p-2 text-sm flex justify-center items-center max-[1000px]:w-fit max-[1000px]:p-2 rounded-full text-zinc-500  hover:scale-95 duration-75 mr-3  ' onClick={() => handleUpdate(c)}  >
                                                        {/* <img src="/images/edit.png" className='h-4 opacity-60' alt="" /> */}
                                                        <i className='fa fa-check opacity-70' ></i>
                                                    </button>
                                                    <button className='p-2 text-sm flex justify-center items-center max-[1000px]:w-fit max-[1000px]:p-2 rounded-full text-zinc-500  hover:scale-95 duration-75 mr-2 ' onClick={() => setEditedCategory(null)} >
                                                        {/* <img src="/images/edit.png" className='h-4 opacity-60' alt="" /> */}
                                                        <i className='fa fa-xmark opacity-70' ></i>
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className='flex h-full flex-1 justify-end box-border pr-2' >
                                                    <button className=' p-2 text-sm flex justify-center items-center max-[1000px]:w-fit max-[1000px]:p-2 rounded-full text-zinc-500  hover:scale-95 duration-75 mr-2 '
                                                        onClick={() => handleEdit(c)}
                                                    >
                                                        <img src="/images/edit.png" className='h-4 opacity-60' alt="" />

                                                    </button>
                                                    <button className=' p-2  text-sm flex justify-center items-center rounded-full text-zinc-500  hover:scale-95 duration-75 max-[1000px]:w-fit max-[1000px]:p-2  ' onClick={() => handleDelete(c)}  >
                                                        <img src="/images/delete.png" className='h-4 opacity-60' alt="" />
                                                    </button>

                                                </div>
                                            )
                                        }

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </motion.div >
        </AdminDashboard >
    )
}

export default CreateCategory