import React from 'react'

const CategoryForm = ({ name, setName, handleSubmit }) => {
    return (
        <div className='min-w-full flex box-border p-4 max-[1000px]:p-1 justify-center' >
            <div className='w-2/3 max-[1000px]:w-full flex items-center justify-between' >
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Add new category' className='text-sm text-zinc-600 p-2 border rounded-lg outline-none mr-3 pl-3 w-1/2 max-[1000px]:w-2/3 ' />

                <div className='border-b border-dashed border-zinc-300 h-0 flex-grow max-[1000px]:hidden ' ></div>

                <button onClick={handleSubmit} className='rounded-lg border p-2 text-sm text-zinc-500 ml-3' >+ Add New</button>
            </div>
        </div>
    )
}

export default CategoryForm