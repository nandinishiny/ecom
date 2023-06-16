import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-footerbcg  border-2 text-white flex flex-col sm:flex-row sm:justify-around p-4 sm:items-center' style={{backgroundColor:"#172337"}}>
      <div className='flex flex-col gap-2 items-center mb-2'>
        <h2 className='font-bold underline'>Download our app</h2>
        <Link><img src="https://st5.depositphotos.com/38540216/64564/v/600/depositphotos_645643436-stock-illustration-google-play-mobile-symbol-logo.jpg" alt="" className='w-40 h-16 object-cover rounded-xl '/></Link>
        <Link><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL0Tx01MgolcvxNVBHfZ1NkJABs2FdtUXUO5djaIXKiksybPUhBXznHgLxcphb-G7k5QM&usqp=CAU" alt=""className='w-40 h-16 object-cover rounded-xl' /></Link>
      </div>
      <div className='flex flex-col items-center gap-2'>
      <img src="https://www.simicart.com/blog/wp-content/uploads/eCommerce-logo-1.jpg" alt="" className=' w-20 h-fit object-cover rounded-xl'/>
      <p>High Quality is our first Priority</p>
      <p>Copy Rights 2023 @Nandini Divity</p>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <h2 className='font-bold underline'>Follow Us </h2>
        <Link className='hover:underline'>Instagram</Link>
        <Link className='hover:underline'>Youtube</Link>
        <Link className='hover:underline'>FaceBook</Link>
      </div>
    </div>

  )
}

export default Footer