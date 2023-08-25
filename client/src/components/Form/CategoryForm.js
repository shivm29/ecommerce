import React from 'react'

const CategoryForm = ({ name, setName, handleSubmit }) => {
    return (
        <div className='font-semibold min-w-full flex box-border p-4 max-[1000px]:p-1 justify-center items-center' >
            <div className='w-2/3 max-[1000px]:w-full flex items-center justify-between' >
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Add new category' className='placeholder:text-zinc-500 text-sm text-zinc-600 p-1 border-b-2  border-zinc-400  outline-none mr-3 pl-2 w-1/2 max-[1000px]:w-2/3 ' />

                <button onClick={handleSubmit} className='font-semibold cursor-pointer border border-zinc-400 text-zinc-500 mt-5 text-sm p-2 px-4 transition duration-100 hover:scale-95' >+ Add New</button>
            </div>
        </div>
    )
}

export default CategoryForm