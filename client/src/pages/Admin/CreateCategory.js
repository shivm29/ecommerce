import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import { useAuth } from '../../context/Auth'
const CreateCategory = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [editedCategory, setEditedCategory] = useState(null);
    const [editedCategoryName, setEditedCategoryName] = useState("");
    const [auth, setAuth] = useAuth()

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
            console.log("delete : ", c)
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

                className='border-t border-l border-zinc-500 box-border p-5 pt-10 min-h-screen min-w-full flex flex-col justify-start items-center max-[800px]:p-3' >



                <CategoryForm name={name} setName={setName} handleSubmit={handleSubmit} />

                <div className='min-w-full h-fit mt-6 flex flex-col justify-center items-center  ' >
                    <div className='flex w-2/3 max-[1000px]:w-full h-fit justify-start items-center border-b border-zinc-400 box-border p-2 pb-4 shadow-sm mb-3' >
                        <div className='flex h-full flex-1 font-semibold text-zinc-500 justify-center border-r-2 border-zinc-400 max-[800px]:text-sm max-[800px]:font-medium ' >Categories</div>
                        <div className='flex h-full flex-1 font-semibold text-zinc-500 justify-center max-[800px]:text-sm max-[800px]:font-medium ' >Actions</div>
                    </div>

                    <div className='flex flex-col min-w-full min-h-fit justify-center items-center mt-2 p-2 box-border font-semibold ' >
                        {
                            categories?.map((c, key) => {
                                return (
                                    <div key={key} className='flex w-2/3 max-[1000px]:w-full h-fit justify-between items-center box-border text-sm max-[1000px]:text-xs mb-3   p-1 px-4  border-zinc-300 max-[800px]:px-0' >

                                        {
                                            editedCategory === c.name ? (
                                                <input
                                                    type="text"
                                                    value={editedCategoryName}
                                                    className='pb-1 text-zinc-500 border-b-2 border-zinc-400 pl-1 outline-none w-72 max-[1000px]:w-40'
                                                    onChange={(e) => setEditedCategoryName(e.target.value)}

                                                />

                                            ) : (<div className='flex h-full flex-1 items-center  '>{c.name}</div>)
                                        }
                                        {/* <div className='border-b border-dashed border-zinc-300 h-0 flex-grow max-[1000px]:hidden ' ></div> */}

                                        {
                                            editedCategory === c.name ? (
                                                <div className='flex h-full flex-1 justify-end box-border pr-2 max-[800px]:pr-0' >
                                                    <button className='mr-5 font-semibold cursor-pointer border border-zinc-400 text-zinc-500 text-sm p-1 px-4 transition duration-100 hover:scale-95 font-sm max-[800px]:text-xs ' onClick={() => handleUpdate(c)}  >Update</button>

                                                    <button className='mr-5 font-semibold cursor-pointer border border-zinc-400 text-zinc-500 text-sm p-1 px-4 transition duration-100 hover:scale-95 font-sm max-[800px]:text-xs' onClick={() => setEditedCategory(null)} >Cancel</button>

                                                </div>
                                            ) : (
                                                <div className='flex h-full flex-1 justify-end box-border pr-2 max-[800px]:pr-0' >

                                                    <button className='mr-5 font-semibold cursor-pointer border border-zinc-400 text-zinc-700 text-sm p-1 px-4 transition duration-100 hover:scale-95 font-sm max-[800px]:text-xs max-[800px]:font-medium' onClick={() => handleDelete(c)}  >Delete</button>
                                                    <button className='mr-5 font-semibold cursor-pointer border border-zinc-400 text-zinc-700 text-sm p-1 px-4 transition duration-100 hover:scale-95 font-sm max-[800px]:text-xs max-[800px]:mr-0 max-[800px]:font-medium' onClick={() => handleEdit(c)}  >Edit</button>
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