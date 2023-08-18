import React, { useEffect, useState } from 'react'
import {IoIosArrowBack} from 'react-icons/io'
import {IoIosArrowForward} from 'react-icons/io'
import {BsBoxArrowRight} from 'react-icons/bs'
import {HiArrowCircleRight} from 'react-icons/hi'
import {HiArrowCircleLeft} from 'react-icons/hi'
import { useSelector } from 'react-redux';
import BannerItem from './BannerItem';
import { Link } from 'react-router-dom';

// const corouselList = [
//     {
//         img:"https://rukminim1.flixcart.com/fk-p-flap/1680/280/image/156452518a7921fb.jpg"
//     },
//     {
//         img:"https://rukminim1.flixcart.com/fk-p-flap/1680/280/image/d6dc40011f48d2da.jpg?q=50"
//     },
//     {
//         img:"https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/bf743b1798a4c119.jpg?q=50"
//     },
// ]

const Corousel = ({products}) => {
    const corouselList = [
        products[0],
        products[1],
        products[2],
        products[4],
        products[5],
    ]
     const [nextItem,setNextItem] = useState(0);
     const index=nextItem;
     const item = corouselList[index];
     const nextItemView =()=>{
        if(nextItem<(corouselList.length-1)){
            setNextItem(nextItem+1)}

     }
     const previousItem =()=>{
        if(nextItem>0){
            setNextItem(nextItem-1)}
     }
     
     useEffect(()=>{
        const timer=setTimeout(()=>{
            if(nextItem<corouselList.length-1){
                nextItemView();
            }
            else{
                setNextItem(0);
            }
            
        },2000);
        return()=>clearTimeout(timer);
     },[nextItem]);

  return (
    <div className='flex sm:w-full justify-between items-centre  mt-4 '>
           <button  onClick={()=>previousItem()}> <HiArrowCircleLeft className='sm:text-6xl text-4xl text-gray-500 cursor-pointer h-fit hover:bg-pink-200'/></button>
            <Link to={`/products/product/${item?._id}`}><img src={item?.images[0]?.url} alt="" className="my-2 sm:w-full object-contain h-auto sm:h-96 cursor-pointer" /></Link>
            <button onClick={()=>nextItemView()}><HiArrowCircleRight  className='sm:text-6xl text-4xl text-gray-500 cursor-pointer h-fit hover:bg-pink-200'/></button>
    </div>
    
  )
}

export default Corousel