import React from 'react'
import '../../styles/navbar.css'
import { useSearch } from '../../context/Search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchForm = () => {
    const [values, setValues] = useSearch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`)
            setValues({ ...values, results: data })
            navigate('/search')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='search-box mx-10 dark:bg-zinc-700'  >
            <input className="search-text dark:text-gray-300" type="text" placeholder="Search Product"
                value={values.keyword}
                onChange={((e) => setValues({ ...values, keyword: e.target.value }))}
            />
            <a href="#" className="search-btn">
                <i className="fas fa-search" onClick={handleSubmit} ></i>
            </a>
        </div>

    )
}

export default SearchForm