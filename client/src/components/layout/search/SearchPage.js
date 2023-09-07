import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
const SearchPage = () => {
    const [search,setSearch] = useState("");
    const navigate = useNavigate();
    const handleKeyUp = (e)=>{
        if (e.key === 'Enter') {
            handleSearch(); // Trigger button click on Enter key press
          }

    }
    const handleSearch = ()=>{
        navigate(`/search?keyword=${search}`);
    }
  return (
    <div className='h-screen'>
    <div className=' flex  justify-center w-full'>
    <div className="mt-20 bg-white flex items-center text-center h-fit border-2 rounded-md w-1/2 ">
    <input
      type="text"
      className="bg-white py-2 px-4 text-lg rounded-l-md w-40  focus:outline-none sm:w-full"
      placeholder="Search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyUp={handleKeyUp}
      autoFocus />

    <div className="flex items-center bg-gray-200 rounded-r-md">
      <Link to={`/search?keyword=${search}`}>
        <div
        className="cursor-pointer text-xl mx-6">
        <FiSearch />
        </div>
      </Link>
    <Link to={'/'}>
      <button
        className="bg-red-400 py-2 px-4 rounded-r-none hover:bg-gray-400 transition-colors duration-200"
      >
        Cancel
      </button>
    </Link>
    </div>
  </div>
  </div>
  </div>
  )
}

export default SearchPage