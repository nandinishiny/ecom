import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {AiOutlineHeart} from 'react-icons/ai'
import {AiFillHeart} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/productSlice';
import { addToLiked,removeFromLiked} from '../../redux/likedSlice'

const CompleteShoppingCard = (props) => {
  const {description,name,price,ratings,images,category,stock,reviews,_id}= props;
  const [addToLikedItem,setAddToLiked]= useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item)=>{
    dispatch(addItem(item));
  }
  const sendToLiked=(item)=>{
    setAddToLiked(true);
    dispatch(addToLiked(item))

  }
  const removeFromLikeditems=(item)=>{
    setAddToLiked(false);
    dispatch(removeFromLiked(item));
  }
  const likedItems = useSelector(state => state.liked.items);
  const isItemLiked = likedItems.some(item => item._id === _id);

  return (
    <div className='sm:w-1/5 w-full m-4 hover:shadow-lg border-0 p-4 justify-around'
     style={{height:"25rem"}}>
        <Link className='flex flex-col items-start gap-2' to={`/product/${_id}`}>
        {images&&<img src={images[0]?.url} alt="" className='w-full h-40 object-contain'/>}
        <h3 className=' text-md font-semibold'
        >{name}</h3>
        <p className='font-xs'>{category}</p>
        <div className='flex gap-2 items-center'>
            <p className=' w-10 p-1 text-center text-xs text-white rounded-sm' style={{backgroundColor:"#388e3c"}}>{ratings} ★</p>
            <p className='text-sm text-gray-500 font-semibold'>{stock} left</p>
        </div>
        <div className='flex gap-3 items-center'>
            <p className='font-semibold'> ₹{price}</p>
            {/* <p className='font-semibold line-through'> ₹{strikedPrice}</p> */}
            {/* <p className='font-semibold text-sm'>{offer}%off</p> */}
        </div>
        <p >{description.slice(0,50)}...</p>
        </Link>
        <div className='flex items-center justify-between'>
        <button className=' w-fit p-1 text-center text-xs text-white rounded-sm bg-blue-500 hover:bg-blue-300 ' onClick={()=>addItemToCart(props)}>Add to cart</button>
        {/* {!addToLikedItem? */}
        {!isItemLiked?
        <button onClick={()=>sendToLiked(props)}><AiOutlineHeart className='text-2xl'/></button>:
        <button onClick={()=>removeFromLikeditems(_id)} ><AiFillHeart className='text-2xl text-pink-500 '/>
        </button>}
        </div>
        
    </div>
   
  )
}

export default CompleteShoppingCard