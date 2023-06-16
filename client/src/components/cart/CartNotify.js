import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'

const CartNotify = () => {
    const [showNotify,setShowNotify]= useState(true)
    useEffect(()=>{
       const timer= setTimeout(() => {
            setShowNotify(false)    
        },3000);
        return()=>{
            clearTimeout(timer)
        }
    },[])
  return showNotify &&
    (<motion.div initial={{y:"-100%"}} whileInView={{y:"0"}} className=' flex justify-end shadow-lg  '>
        <div className='text-center fixed w-1/5 border-2 bg-blue-500  '>
            <div className='w-fit h-fit text-white font-bold'>
                <p>one item added to cart!</p>
                <p>total 3 items added</p>
            </div>
        </div>
    </motion.div>)
  
}

export default CartNotify