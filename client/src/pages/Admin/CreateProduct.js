import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import { Select } from 'antd';
import axios from 'axios';
import { motion } from 'framer-motion'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const { Option } = Select

const CreateProduct = () => {

    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [photo, setPhoto] = useState("")
    const [shipping, setShipping] = useState("")
    const [category, setCategory] = useState("")

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

    const handleCreateProduct = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);
            productData.append("shipping", shipping);


            const { data } = await axios.post("/api/v1/product/create-product", productData);

            if (data?.success) {
                toast.success("Product Created Successfully");
                navigate("/dashboard/admin/products");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("error", error);
            toast.error("Something went wrong");
        }
    };


    useEffect(() => {
        getAllcategories()
    }, [])

    return (
        <AdminDashboard>

            <motion.div
                initial={{ opacity: 0.5, y: '5%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                exit={{ opacity: 0 }}
                className='mt-2 p-10 pb-0 flex w-full flex-col'  >
                <h1 className='mb-10 text-3xl text-zinc-600 font-Nunito' >Create a Product </h1>
                <div className='grid min-w-full grid-cols-3 gap-4 h-fit  box-border mb-5' >

                    <div className='flex items-center' >
                        <Select
                            size='medium'
                            showSearch
                            onChange={(value) => {
                                setCategory(value);
                            }}
                            className='w-full '
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



                    <input
                        type="text"
                        value={name}
                        placeholder="Write a Name"
                        className="form-control border rounded-lg w-full p-1 outline-none pl-2  text-sm placeholder:text-zinc-300 placeholder:font-light "
                        onChange={(e) => setName(e.target.value)}
                    />





                    <input
                        type="number"
                        value={price}
                        placeholder="Write a Price" className="form-control border rounded-lg w-full p-1 outline-none pl-2 text-sm placeholder:text-zinc-300 placeholder:font-light " onChange={(e) => setPrice(e.target.value)}
                    />



                    <input
                        type="number"
                        value={quantity}
                        placeholder="Write a Quantity" className="form-control border rounded-lg w-full p-1 outline-none pl-2  text-sm placeholder:text-zinc-300 placeholder:font-light " onChange={(e) => setQuantity(e.target.value)}
                    />


                    <div className='flex items-center' >

                        <Select
                            bordered
                            placeholder="Select Shipping "
                            size="medium"
                            showSearch
                            className="form-select w-full "
                            onChange={(value) => {
                                setShipping(value);
                            }}
                        >
                            <Option value="0">No</Option>
                            <Option value="1">Yes</Option>
                        </Select>
                    </div>

                </div>


                <textarea
                    type="text"
                    value={description}
                    placeholder="Write a Description"
                    className="form-control border rounded-lg w-5/6 h-56 box-border p-2  outline-none font-normal text-sm placeholder:text-zinc-300 placeholder:font-light "
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label className="mt-6 border p-2 px-4 cursor-pointer w-fit text-sm rounded-lg  shadow-md hover:scale-95 duration-100 text-zinc-400 ">
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
                    <button className='mt-20 mr-5  border p-2 px-4 cursor-pointer w-fit text-sm rounded-lg  shadow-md hover:scale-95 duration-100 bg-gradient-to-r from-pink-500 via-fuchsia-600 to-fuchsia-700  text-zinc-100 opacity-75' onClick={handleCreateProduct}  >Submit</button>
                </div>

            </motion.div>

        </AdminDashboard>
    )
}

export default CreateProduct