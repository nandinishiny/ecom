import React, { useEffect, useState } from 'react'
import CompleteShoppingCard from './CompleteShoppingCard'
import {useSelector } from 'react-redux';

const CompleteShoppingList = () => {
  const products = useSelector(store => store.productDisplay.items);
  const [page, setPage] = useState(1);
  return (
    <>
      <div className='flex flex-wrap justify-around'>
        {products.map((item, index) => (
          <CompleteShoppingCard key={item._id} {...item} />
        ))}
      </div>
      <div className='flex gap-4 justify-center'>
        <button
          className='bg-yellow-500 text-white p-1'
          onClick={() => setPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage)}
        >
          prev page {page - 1}
        </button>
        <button
          className='bg-yellow-500 text-white p-1'
          onClick={() => setPage(page+1)}
        >
          next page {page + 1}
        </button>
      </div>
    </>
  )
}

export default CompleteShoppingList