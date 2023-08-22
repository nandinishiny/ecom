import  { useState } from 'react'
import React from "react";
import { Link, useParams } from 'react-router-dom'
import Confetti from 'react-confetti'
import { useSelector } from 'react-redux'

export default function PaymentSuccess() {
  const params = useParams;

  return (
    <div className='h-screen w-full mt-4' >
      <Confetti
        width={innerWidth} height={innerHeight} gravity={0.58} friction={0.99} tweenDuration={5000} recycle={false} />
      <div className='flex justify-center flex-col items-center h-[500px]'>
        <h1 className=' text-[40px] font-semibold '>Order Confirmed !</h1>
        <Link to='/user/orders'><button className='font-bold bg-blue-500 text-white 
        hover:bg-blue-300 p-2 m-4 rounded-sm'>Go to Orders</button></Link>
      </div>

    </div>
  )
}