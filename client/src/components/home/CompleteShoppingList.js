import React, { useEffect, useState } from 'react'
import CompleteShoppingCard from './CompleteShoppingCard'
import { useDispatch, useSelector } from 'react-redux';
import { displayProducts } from '../../redux/productDisplaySlice';
import { Link } from 'react-router-dom';
// const arr = new Array(30).fill('')


const CompleteShoppingList = () => {
  const dispatch = useDispatch();
  const products = useSelector(store=>store.productDisplay.items);
  const [page,setPage] = useState(1);
  // const [showItems,setShowItems]=useState([]);
  useEffect(()=>{
    getProducts();

  },[page]);
  const getProducts=async()=>{
    const data = await fetch(`http://localhost:3000/api/v1/products?page=${page}`);
    const jsonData = await data.json();
    dispatch(displayProducts(jsonData.products))
  }
  return (
    <>
      <div className=' flex flex-wrap justify-around '>
            {products.map((item,index)=>{
              return(<CompleteShoppingCard key={item._id} {...item}/>)
          })}
      </div>
      <div className='flex gap-4 justify-center'>
        <button className='bg-yellow-500 text-white p-1' onClick={()=>page>1?setPage(page-1):setPage(page)}>prev page </button>
        <button className='bg-yellow-500 text-white p-1' 
        onClick={()=> (page<products.length/8+1)?setPage(page+1):setPage(page)}>
          next page </button>
      </div>
    </>
  )
}

export default CompleteShoppingList