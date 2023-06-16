import React from 'react'
import { Link } from 'react-router-dom'

const ProductCreation = () => {
  return (
    <div>
        <Link to={'/product/new'}><p className='font-bold text-lg p-1'>Create a product</p></Link>
        <Link to={'/product/new'}><p className='font-bold text-lg p-1'>product update</p></Link>
        <Link to={'/product/new'}><p className='font-bold text-lg p-1'>Create a product</p></Link>
        <Link to={'/product/new'}><p className='font-bold text-lg p-1'>Create a product</p></Link>
    </div>
  )
}

export default ProductCreation