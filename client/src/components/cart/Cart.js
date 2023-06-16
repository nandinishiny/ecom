import React from 'react'
import {useSelector} from 'react-redux'
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/productSlice';

const Cart = () => {
  const dispatch = useDispatch()
  const clearAll =()=>{
    dispatch(clearCart())
  }
  const cart = useSelector(store=>store.product.items);
  if(cart.length===0){
    return(<EmptyCart/>)
  }
  return (
    <div className='flex h-screen  sm:flex-row flex-col   '
    style={{backgroundColor:"#f1f3f6"}}>
      <div className='sm:w-3/5 w-11/12  h-full sm:ml-20 mx-4 mt-10 flex flex-col gap-2  '>
        <div className='bg-white w-full h-3/5 overflow-auto sm:shadow-lg' >
          {cart.map((item,index)=>{
              return(<CartItem {...item} key={item._id}  />)
            })}
        </div>
        <div className='w-full h-20 bg-white shadow-lg flex justify-end items-center'>
          <button className='bg-blue-500 rounded-md text-white px-10 py-3 m-4 font-semibold'>
            PLACE ORDER
          </button> 
        </div>
        <div className='w-full h-20 bg-white shadow-lg flex justify-end items-center'>
          <button className=' rounded-md e px-10 py-3 m-4 font-semibold' onClick={()=>clearAll()}>
            CLEAR ALL
          </button> 
        </div>
        
        
      </div>
      <div className='sm:w-2/5 h-1/2 flex items-center justify-center w-full '>
        <div className='bg-white sm:h-3/4 h-fit mb-4 w-3/4 px-4 sm:px-8 '>
          <h4 className='py-4 font-bold border-b text-gray-600'>PRICE DETAILS</h4>
          <ul className='flex flex-col gap-2 font-semibold'>
            <li className='flex justify-between  items-center'><span>Price</span><span>₹1,88,950</span></li>
            <li className='flex justify-between items-center'><span >Discount</span><span>- ₹29,851</span></li>
            <li className='flex justify-between items-center'><span >Price</span><span>Free</span></li>
            <li className='flex justify-between  items-center border-t border-b py-4 font-bold'><span >Total</span><span>₹1,59,099</span></li>
          </ul>
          <p className='mt-4'>You will save ₹29,851 on this order</p> 


        </div>
        

      </div>

    </div>
  )
}

export default Cart