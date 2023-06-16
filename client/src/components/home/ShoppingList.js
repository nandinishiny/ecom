import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {IoIosArrowBack} from 'react-icons/io'
import {IoIosArrowForward} from 'react-icons/io'
import Metadata from './Metadata'
import { useSelector } from 'react-redux'
import CompleteShoppingCard from './CompleteShoppingCard'

const ShoppingList = () => {
  const products = useSelector(store=>store.productDisplay.items);
  const [startIndex,setStartIndex] = useState(0);
  const itemsPerPage = 4;
  const visibleItems = products.slice(startIndex,startIndex+itemsPerPage);
  const movetoNextItems =()=>{
    if(startIndex+itemsPerPage<products.length){
      setStartIndex(startIndex+itemsPerPage);
    }

  }
  const movetoPreviousItems =()=>{
    if(startIndex>0){
      setStartIndex(startIndex-itemsPerPage);
    }
    
  }
  if(products.length===0){
    return(<div className='sm:border-2 h-full flex flex-col justify-end items-center  w-full p-2 gap-6 mb-2'>
    <h2 className='text-2xl font-medium text-center'>View All Products</h2>
    <Link to={'/products'}><button className=' text-white font-semibold rounded-xs  p-2' style={{backgroundColor:"#2874f0",}}>VIEW ALL</button></Link>
    <img src="https://rukminim1.flixcart.com/fk-p-flap/278/278/image/7593e7b6640822c1.jpg?q=90" alt="" className='pt-6'/>
    
</div>)
  }
  return (
    <>
    <div className='m-4 flex sm:flex-row flex-col ' >
        <div className='sm:border-2 h-80 flex flex-col justify-end items-center sm:w-1/6 w-full p-2 gap-6 mb-2'>
            <h2 className='text-2xl font-medium text-center'>View All Products</h2>
            <Link to={'/products'}><button className=' text-white font-semibold rounded-xs  p-2' style={{backgroundColor:"#2874f0",}}>VIEW ALL</button></Link>
            <img src="https://rukminim1.flixcart.com/fk-p-flap/278/278/image/7593e7b6640822c1.jpg?q=90" alt="" className='pt-6'/>
            
        </div>
        <div className='sm:w-5/6 flex items-center sm:flex-row flex-col'>
          <button className="hover:bg-pink-200 sm:block hidden" onClick={()=>movetoPreviousItems()}> <IoIosArrowBack className='sm:text-6xl text-4xl text-gray-500 '/></button>
          <button className="hover:bg-pink-200 sm:hidden block bg-blue-600 text-white p-2 rounded-md" onClick={()=>movetoPreviousItems()}> 
          Previous</button>
          
          <div className='sm:w-full sm:border-2 sm:ml-4 sm:overflow-x-auto flex sm:flex-nowrap flex-wrap w-full '>
          {products && visibleItems.map((item,index)=>{
          return(<CompleteShoppingCard key={item._id} {...item}/>)
          })}
          </div>
          <button className="hover:bg-pink-200 sm:block hidden" onClick={()=>movetoNextItems()}><IoIosArrowForward className='sm:text-6xl text-4xl text-gray-500'/></button>
          <button className="hover:bg-pink-200 sm:hidden block bg-blue-600 text-white p-2 rounded-md" onClick={()=>movetoNextItems()}> 
          Next</button>
        </div>
        </div>
    </>
  )
}

export default ShoppingList