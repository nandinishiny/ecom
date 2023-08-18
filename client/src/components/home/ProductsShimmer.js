import React from 'react'

const ProductsShimmer = () => {
    const arr = new Array(12).fill(1);
  return (
    <div className='w-full h-screen flex justify-around bg-white flex-wrap gap-4  '>
        {arr.map((item,index)=>{
            return(<div className='bg-blue-50 w-1/5 h-1/4 ' key={index}></div>)
        })}
        

    </div>
  )
}

export default ProductsShimmer