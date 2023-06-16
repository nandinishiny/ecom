import React, { useEffect, useState } from 'react'
import {IoIosArrowBack} from 'react-icons/io'
import {IoIosArrowForward} from 'react-icons/io'
const corouselList = [
    {
        img:"https://rukminim1.flixcart.com/fk-p-flap/1680/280/image/156452518a7921fb.jpg"
    },
    {
        img:"https://rukminim1.flixcart.com/fk-p-flap/1680/280/image/d6dc40011f48d2da.jpg?q=50"
    },
    {
        img:"https://rukminim1.flixcart.com/fk-p-flap/1688/280/image/bf743b1798a4c119.jpg?q=50"
    },
]

const Corousel = () => {
     const [nextItem,setNextItem] = useState(0);
     const index=nextItem;
     const {img} = corouselList[index];
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
            
        },5000);
        return()=>clearTimeout(timer);
     },[nextItem]);

  return (
    <div className='flex sm:w-full justify-center  items-center mt-4'>
           <button className="hover:bg-pink-200" onClick={()=>previousItem()}> <IoIosArrowBack className='sm:text-6xl text-4xl text-gray-500'/></button>
            <img src={img} alt="" className='my-2  sm:w-11/12 h-fit w-5/6'/>
            <button onClick={()=>nextItemView()} className="hover:bg-pink-200"><IoIosArrowForward  className='sm:text-6xl text-4xl text-gray-500'/></button>
        </div>
    
  )
}

export default Corousel