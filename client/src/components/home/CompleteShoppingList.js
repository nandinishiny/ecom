import React, { useEffect, useState } from 'react'
import CompleteShoppingCard from './CompleteShoppingCard'
import {useSelector } from 'react-redux';
import ProductsShimmer from './ProductsShimmer';

const CompleteShoppingList = () => {
  const [products,setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const data = await fetch(`http://localhost:3000/api/v1/products`);
    const jsonData = await data.json();
    setProducts(jsonData.products);
  }
  // const products = useSelector(store => store.productDisplay.items);
  const [page, setPage] = useState(1);
  if(products.length ===0){
    return (<ProductsShimmer/>)
  }
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