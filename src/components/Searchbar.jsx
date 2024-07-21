import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {FiSearch} from 'react-icons/fi'


const Searchbar = () => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/search/${searchTerm}`)
    }

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="p-2 text-gray-400 focus-within:text-gray-600">
            <label htmlFor="search-field" className="sr-only">
                Search all songs
            </label>
            <div className="flex flex-row justify-start items-center">
                <FiSearch aria-hidden="true" className="w-5 h-5 ml-4" />                
                <input type="search" 
                    placeholder="What do you want to listen to?"
                    name="search-field"
                    id="search-field"
                    style={{'border': '1px solid rgb(67 68 71)',
                        'borderRadius': '10px',
                        'marginLeft': '12px',
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white p-4"/>
            </div>
        </form>

    )
}

export default Searchbar;
