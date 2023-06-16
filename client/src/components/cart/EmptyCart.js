import React from 'react'
import { Link } from 'react-router-dom'
const EmptyCart = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center' style={{backgroundColor:"#f1f3f6"}}>
        <div className='sm:h-1/2 sm:w-1/2 h-full w-full bg-white flex flex-col items-center gap-4'>
            <img src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="" className='h-1/2 w-fit' />
            <h2 className='font-semibold text-xl'>Your Cart is Empty !</h2>
            <p >Add Items to it now</p>
            <Link to="/products"><button className='w-fit p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-300'>Shop Now</button></Link>

        </div>
    </div>
  )
}

export default EmptyCart