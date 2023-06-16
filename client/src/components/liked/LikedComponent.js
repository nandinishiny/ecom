import React from 'react'
import { useSelector } from 'react-redux'
import LikedEmpty from './LikedEmpty';
import LikedItem from './LikedItem';

const LikedComponent = () => {
    const likedItems= useSelector(store=>store.liked.items);
    if(likedItems.length===0){
        return(<LikedEmpty/>)
    }
  return (
    <div>
    {likedItems.map((item)=>{
            return(<LikedItem {...item} key={item._id} />)})
    }
    </div>
    
  )
}

export default LikedComponent