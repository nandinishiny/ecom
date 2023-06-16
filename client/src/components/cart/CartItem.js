import React from 'react'
import {useDispatch} from 'react-redux'
import { removeItem } from '../../redux/productSlice';
const CartItem = (props) => {
  // const {img,title,type,rating,noOfRatings,price,strikedPrice,offer,id} = items;
  const {description,name,price,ratings,images,category,stock,reviews,_id}= props;
  const dispatch = useDispatch();
  const removeItemFromCart=(id)=>{
    dispatch(removeItem(id))

  }
  // return(<div>cart</div>)
  return (
    <div className='flex gap-4 m-4 border-b pb-4'>
      <img src={images[0].url} alt="" className='w-36 h-32 object-contain ' />
      <div>
        <h3 className='font-bold'>{name}</h3>
        <p className='text-sm text-gray-500'>{category}</p>
        <div className=' flex justify-start gap-4 font-semibold'>
          {/* <p className='line-through'>₹{strikedPrice}</p> */}
          <p>₹{price}</p>
          <p className='text-sm'>{_id}</p>
        </div>
        <div>
          <button className='w-24 text-white bg-blue-500 rounded-md mr-4 mt-4 hover:bg-blue-300'>Buy Now</button>
          <button onClick={()=>removeItemFromCart(_id)}
            className='w-24 text-white bg-pink-500 rounded-md mr-4 mt-4 hover:bg-pink-300'>
            Remove
            </button>

        </div>
        
      </div>
    </div>
  )
}

export default CartItem