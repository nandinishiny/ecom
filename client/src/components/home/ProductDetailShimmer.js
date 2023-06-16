import React from 'react'

const ProductDetailShimmer = () => {
  return (
    <div className='w-full h-screen flex justify-center 'style={{backgroundColor:"rgb(235 242 254)"}}>
        <div className='w-11/12 bg-white h-full flex gap-4'>
            <div className='h-full w-2/5'>
                <div className=' bg-blue-50 h-1/2 m-5 w-full'></div>
                    <div className='flex items-center justify-center gap-4 w-full'>
                    <button className='w-32 h-10 bg-blue-50'></button>
                    <button className='w-32 h-10 bg-blue-50'></button>
                </div>
            </div>
            <div className='h-full w-3/5 flex flex-col items-center justify-start m-5'>
                <p className='h-10 w-3/5 m-4 bg-blue-50'></p>
                <p className='h-10 w-3/5  m-4 bg-blue-50'></p>
                <p className='h-10 w-3/5 m-4 bg-blue-50'></p>
                <p className='h-10 w-3/5 m-4 bg-blue-50'></p>
                <p className='h-10 w-3/5 m-4 bg-blue-50'></p>

            </div>

        </div>

    </div>
  )
}

export default ProductDetailShimmer