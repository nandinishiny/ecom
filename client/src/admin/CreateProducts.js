import React from 'react'
import picnew from '../assets/picenter.png'
const CreateProducts = () => {
  //https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYZgQkGhzzaGImYLNE-ZWbI7tkXePwnd0DqA&usqp=CAU
  const submitCreateProductForm=(e)=>{
    e.preventDefault();



  }
  return (
    <div className='h-screen w-full flex  justify-center bg-blue-50  '>
      <div className='w-3/4 bg-white m-1 flex justify-center '>
        <form className='flex flex-col justify-start items-start pl-4 w-3/4 mt-4 '
        onSubmit={(e)=>submitCreateProductForm(e)}>
          <input type="text" placeholder='Product Name'
           className='p-1 outline-none border-b-2 w-full m-1 ' />
          <input type="number" placeholder='Price'
          className='p-1 outline-none border-b-2  m-1  '/>
          <input type="number" placeholder='Ratings'
          className='p-1 outline-none border-b-2  m-1  ' />
          <label htmlFor="pic"><img src={picnew} alt="" /></label>
          <input type="file" id='pic' className='hidden'/>
          
          <button type='submit' className='p-2 bg-pink-500 text-white m-1 rounded-md'>create product</button>
        </form>
      </div>

    </div>

  )
}

export default CreateProducts