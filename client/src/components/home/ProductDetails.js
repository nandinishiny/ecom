
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { addItem } from '../../redux/productSlice';
import CartNotify from '../cart/CartNotify';
import {IoIosArrowBack} from 'react-icons/io'
import {IoIosArrowForward} from 'react-icons/io'
import ProductDetailShimmer from './ProductDetailShimmer';
const ProductDetails = () => {
    const [singleItem,setSingleItem]=useState("");
    const [showNotify,setShowNotify]=useState(false);
    const [nextItem,setNextItem] = useState(0);
    const [showAddComment,setShowAddComment] = useState(false);
    const [commentInput,setCommentInput] = useState("")
     
    const {id}=useParams();
    useEffect(()=>{
        getSingleItemDetails()
    },[]);
    const getSingleItemDetails =async()=>{
        const data = await fetch(`http://localhost:3000/api/v1/product/${id}`);
        const jsonData = await data.json();
        setSingleItem(jsonData.product) 
    }
    const {description,name,price,ratings,images,category,stock,reviews,noOfReviews}= singleItem;
    // const img = images[nextItem];
    const nextItemView =()=>{
       if(nextItem<(images.length-1)){
           setNextItem(nextItem+1)}

    }
    const previousItem =()=>{
       if(nextItem>0){
           setNextItem(nextItem-1)}
    }
    const dispatch = useDispatch();
    const addItemtoCart=(item)=>{
        dispatch(addItem(item))
        setShowNotify(true)
    }
    const addComment =(val)=>{
        setShowAddComment(val)
    }
    if(!singleItem){
        return <ProductDetailShimmer/>
    }
  return (
    <>
    {showNotify&&<CartNotify />}       
    <div className='w-full h-screen flex justify-center ' style={{backgroundColor:"rgb(235 242 254)"}}>
        <div className=' w-11/12 shadow-lg border-t-2 flex flex-col sm:flex-row overflow-y-auto' style={{backgroundColor:"#ffffff"}}>
            <div className='flex flex-col sm:w-2/5 w-full sm:p-10 p-1'>
                <div className='w-full sm:h-3/5 h-60 flex flex-row items-center justify-center 'style={{backgroundColor:"rgb(251 251 251)"}}>
                    <button  onClick={()=>previousItem()}><IoIosArrowBack/></button>
                    <img src={images[nextItem].url} alt="" className='w-full object-contain p-2 h-full rounded-xl' />
                    <button onClick={()=>nextItemView()}><IoIosArrowForward/></button>
               
                </div>
                <div className='flex justify-center'>
                <button className='m-4 rounded-sm w-fit sm:p-2 p-1 text-center text-lg text-white bg-blue-500 hover:bg-blue-300 font-semibold 'onClick={()=>addItemtoCart(singleItem)} >Add to cart</button>
                <button className='m-4 w-fit  text-center text-lg text-white rounded-sm 
                bg-blue-500 hover:bg-blue-300  font-semibold sm:p-2 p-1 ' >Buy now</button>
                </div>
            </div>
            <div className='flex flex-col px-2 items-start  sm:w-3/5 w-full sm:pt-12 gap-2'>
                <h2 className='text-xl font-bold'>{name}</h2>
                <p>{`${category[0].toUpperCase()}${category.slice(1,category.length)}`}</p>
                <div className='flex gap-3 items-center'>
                    <p className='text-2xl'>₹{price} </p>
                    <p className='line-through  text-gray-600'>₹{price+1000} </p>
                    <p >10 % off</p>
                </div>
                <div className='flex gap-3 items-center'>
                <p className=' w-fit p-2 text-center text-sm text-white rounded-sm '
                style={{backgroundColor:"#388e3c"}}>
                    {ratings} ★</p>
                    <span>({noOfReviews}) reviews</span>
                </div>
                <div className='flex items-start gap-3'>
                    <h3 className='text-sm font-semibold'>Description: </h3>
                    <p>{description}</p>
                </div>
                <div className='flex flex-col items-start'>
                    <h5 className='text-lg font-semibold mt-10'>Comments</h5>
                    <button onClick={()=>addComment(true)} className='p-1 bg-yellow-200'>Add your comment
                    </button>
                    {showAddComment&&
                    (<div className='overflow-x-auto'>
                        <input type="text" 
                        className='outline-none border-b w-full border-gray-800 w-fit p-1 '
                         autoFocus style={{width:"800px",whiteSpace:"normal",
                         overflowWrap: "break-word"}} 
                         value={commentInput}
                         onChange={(e)=>setCommentInput(e.target.value)} />
                         <button onClick={()=>addComment(false)}
                         className='p-1 bg-yellow-200 m-1'>Cancel</button>
                         <button className='bg-blue-600 p-1 m-1  text-white'>Submit</button>

                    </div>)}
                    {reviews.map((item)=>{
                    return(
                    <div className=' border-b p-1 m-1'>
                        <p className='text-sm text-gray-600 font-semibold'>
                        {item.name[0].toUpperCase()+item.name.slice(1,item.name.length)}</p>
                        <div className='flex gap-2 m-1'>
                        <p className=' w-10 py-1 text-center text-xs text-white rounded-sm bg-yellow-700' >{item.rating} ★</p>
                        <p className='text-sm text-gray-600 font-semibold'>{item.comment}</p>
                        </div>
                        
                        

                    </div>)
                })}
                </div>

                

            </div>
        </div>
    </div>
    </>
  )
}

export default ProductDetails