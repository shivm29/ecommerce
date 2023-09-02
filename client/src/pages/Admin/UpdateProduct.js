import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import { Select } from 'antd';
import axios from 'axios';
import { motion } from 'framer-motion'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/navbar.css'

const { Option } = Select

const UpdateProduct = () => {
    const params = useParams()
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [photo, setPhoto] = useState(null)
    const [shipping, setShipping] = useState("")
    const [category, setCategory] = useState("")
    const [log, setLog] = useState("")
    const [Id, setID] = useState("")
    const [fit, setFit] = useState("")

    const navigate = useNavigate()

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

    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("category", category);
            productData.append("shipping", shipping);
            productData.append("fit", fit)
            photo && productData.append("photo", photo)


            const { data } = await axios.put(`/api/v1/product/update-product/${Id}`, productData);

            if (data?.success) {
                toast.success("Product Updated Successfully");
                navigate("/dashboard/admin/products");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("error", error);
            toast.error("Something went wrong");
        }
    };

    // get product : 
    const getProductDetails = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)

            if (data?.success) {
                console.log(data)
                setID(data?.product?._id)
                setName(data?.product?.name)
                setPrice(data?.product?.price)
                setCategory(data?.product?.category._id)
                setShipping(data?.product?.shipping)
                setQuantity(data?.product?.quantity)
                setDescription(data?.product?.description)
                setFit(data?.product?.fit)

            } else {
                toast.error(data.message)
                console.log("Error in fetching details")
            }

        } catch (error) {
            console.log(error)
            toast.error("Error in fetching details")
        }
    }

    const deleteProduct = async () => {
        try {

            const { data } = await axios.delete(`/api/v1/product/delete-product/${Id}`)
            if (data.success) {
                console.log(data)
                navigate('/dashboard/admin/products')
            }
            else {
                console.log(data.message)
                toast.error(data.message)
            }


        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getAllcategories()
        getProductDetails()

    }, [])

    console.log(log)

    return (
        <AdminDashboard>

            <motion.div
                initial={{ opacity: 0.5, y: '5%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                exit={{ opacity: 0 }}
                className='mt-2 p-10 pb-0 flex w-full flex-col'  >
                <h1 className='mb-10 text-xl font-semibold text-zinc-600 font-Nunito' >Update Product </h1>
                <div className='grid min-w-full grid-cols-3 gap-4 h-fit  box-border mb-5' >

                    <input
                        type="text"
                        value={name}
                        placeholder="Write a Name"
                        className="form-control border-b-2 border-zinc-500 w-full p-1 outline-none pl-2 font-semibold  text-sm placeholder:text-zinc-500 placeholder:font-semibold "
                        onChange={(e) => setName(e.target.value)}
                    />


                    <input
                        type="number"
                        value={price}
                        placeholder="Write a Price" className="form-control  border-b-2 border-zinc-500 font-semibold  w-full p-1 outline-none pl-2 text-sm placeholder:text-zinc-500 placeholder:font-semibold " onChange={(e) => setPrice(e.target.value)}
                    />



                    <input
                        type="number"
                        value={quantity}
                        placeholder="Write a Quantity" className="form-control font-semibold border-b-2 border-zinc-500 w-full p-1 outline-none pl-2  text-sm placeholder:text-zinc-500 placeholder:font-semibold " onChange={(e) => setQuantity(e.target.value)}
                    />

                    <div className='flex items-center' >
                        <Select
                            size='medium'
                            showSearch
                            onChange={(value) => {
                                setCategory(value);
                            }}
                            value={category}
                            className='w-full font-semibold '
                            placeholder="Select a Category"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                        >
                            {
                                categories?.map((c) => (
                                    <Option onClick={() => setCategory(c.value)} key={c._id} value={c._id} >
                                        {c.name}
                                    </Option>
                                ))
                            }
                        </Select>
                    </div>


                    <div className='flex items-center' >

                        <Select
                            placeholder="Select Shipping "
                            size="medium"
                            showSearch
                            className="form-select w-full font-semibold "
                            onChange={(value) => {
                                setShipping(value);
                            }}
                        >
                            <Option value="0">No</Option>
                            <Option value="1">Yes</Option>
                        </Select>
                    </div>

                </div>



                <div className='grid grid-cols-2' >
                    <textarea
                        type="text"
                        value={description}
                        placeholder="Write a Description"
                        className="form-control border-b-2 font-semibold border-r-2 border-zinc-500 w-2/3 h-56 box-border p-2  outline-none font-normal text-sm placeholder:text-zinc-500 placeholder:font-semibold mt-5 "
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <textarea
                        type="text"
                        value={fit}
                        placeholder="Write a fit"
                        className="form-control border-b-2 font-semibold border-r-2 border-zinc-500 w-2/3 h-56 box-border p-2  outline-none font-normal text-sm placeholder:text-zinc-500 placeholder:font-semibold mt-5 "
                        onChange={(e) => setFit(e.target.value)}
                    />
                </div>


                <label className="mt-6 font-semibold border border-zinc-400 p-2 px-4 cursor-pointer w-fit text-sm  hover:scale-95 duration-100 text-zinc-500 ">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                    />
                </label>

                <div className='flex min-w-full justify-end' >
                    <button className='mr-5 font-semibold cursor-pointer border border-zinc-400 text-zinc-500 mt-5 text-sm p-2 px-4 transition duration-100 hover:scale-95' onClick={handleUpdateProduct}  >Update Product</button>
                    <button className='mr-5 font-semibold bg-zinc-700 cursor-pointer border border-zinc-400 text-white mt-5 text-sm p-2 px-4 transition duration-100 hover:scale-95' onClick={deleteProduct}  >Delete Product</button>
                </div>

            </motion.div>

        </AdminDashboard>
    )
}

export default UpdateProduct