import React, { useState } from 'react'

const Search = () => {
  const [searchText,setSearchText] = useState('');
  const searchSubmitHandler=(e)=>{
    e.preventDefault();
    if(searchText.trim()){
      history.push(`/products/${searchText}`)
    }else{
      history.push(`/products`)

    }

  }
  return (
    <div className='h-screen w-full flex p-4 justify-center  '>
      <form onSubmit={(e)=>searchSubmitHandler(e)}>
          <input type="text" 
          className='p-1 outline-none text-lg border-b border-gray-400 w-fit ' 
          autoFocus placeholder='Search Here' 
          value={searchText}
          onChange={(e)=>setSearchText(e.target.value)} />
          <button className='text-sm p-1 bg-yellow-700 text-white '
          onClick={()=>handleSearch()}
          type='submit'>Search</button>
        </form>
    </div>
  )
}

export default Search