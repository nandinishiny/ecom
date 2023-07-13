import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {RxHamburgerMenu} from 'react-icons/rx'
import {FiSearch} from 'react-icons/fi'
import {BsCart4} from 'react-icons/bs'
import {RiFolderUserFill} from 'react-icons/ri'
import {BsFillHeartFill} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { newRequest } from '../userAuth/newRequest'

const Header = () => {
  const menuRef = useRef(null);
  const buttonRef=useRef(null);
  const navigate = useNavigate();
  const cart = useSelector((store)=>store.product.items)
  const liked = useSelector((store)=>store.liked.items)
  // const user= useSelector(store=>store?.user?.user)
  const [showMenu,setShowMenu] = useState(false)
  // const user = JSON.parse(localStorage.getItem("currentUser"));
  // const dispatch = useDispatch();
  
  
  useEffect(()=>{
    const handleClickOutside =(e)=>{
      if(menuRef.current && !buttonRef.current.contains(e.target)){
        //&& !menuRef.current.contains(e.target)
        //e.target means weather click happens or not
        setShowMenu(false)
      }
    }
    document.addEventListener('click',handleClickOutside);
    return()=>{
      document.removeEventListener('click',handleClickOutside);
    }
  },[])
  const logOut=async()=>{
    try {
      await newRequest.get("/logout"); 
      localStorage.removeItem("currentUser");
      navigate("/");
      
    } catch (error) {
      console.log(error);
      
    }
  }
  const userInLst = JSON.parse(localStorage.getItem("currentUser"));
  
  return (
    <div className='w-full'>
    <div className='flex items-center justify-between px-2 sm:px-6 py-6 sm:py-0  shadow-lg  '>
      <ul className='flex items-center'>
        <Link><li ><RxHamburgerMenu className='text-lg sm:text-2xl '/></li></Link>
        <Link><li className='hidden sm:block'><img src="https://www.simicart.com/blog/wp-content/uploads/eCommerce-logo-1.jpg" alt="" className=' w-28 h-20 object-cover'/></li></Link>
      </ul>
      <ul className='flex items-center gap-4 sm:gap-6 font-semibold'>
        <li ><Link>Home</Link></li>
        <li ><Link to={'/products'}>Products</Link></li>
        <li className='hidden sm:block'><Link>About</Link></li>
        {userInLst && userInLst?.role !=='admin'&&<li className='hidden sm:block'><Link>Contact</Link></li>}
        {userInLst && userInLst?.role ==='admin'&&<li className='bg-pink-500 text-white p-1 rounded-md'>
          <Link to={"/admin"}>Admin Block</Link></li>}
      </ul>
      <ul className='flex items-center gap-6 text-xl sm:text-2xl'>
      <Link to={'/search'}><li><FiSearch /></li></Link>
      <Link to={`/cart`}><li className='flex items-center'><BsCart4 /> <span className='text-xl font-semibold'>--{cart.length}</span></li></Link>
      <Link to={`/liked`}>
        <li className='flex flex-col items-center justify-center relative bottom-2' >
        <span className='text-sm relative top-5 text-white font-bold'>{liked.length}</span>
      <BsFillHeartFill className=' text-pink-600 text-2xl'/></li></Link>
      {!userInLst?
      (<Link to={"/login"}><li><RiFolderUserFill /></li></Link>):
      (<div className='flex items-center justify-between sm:flex-row flex-col sm:gap-2 '>
        <div className='flex flex-col items-center justify-center'>
         <button ref={buttonRef} onClick={()=>setShowMenu(!showMenu)}>
          <img src="https://yt3.googleusercontent.com/ytc/AGIKgqN11FeTgpZA4iZHLxK-Cv3V-ShfsTrwYvSZyb1G=s176-c-k-c0x00ffffff-no-rj-mo" alt=""
         className='rounded-full w-10 h-10 relative'  />
         </button>
         {userInLst.role==="admin"&&<p className='text-sm font-bold'>admin</p>} 
        </div>
        <Link to='/user'><li className='text-sm font-bold' >{ userInLst.name}</li></Link>
      </div>)
      }
      </ul>
    </div>
    {showMenu&& <div ref={menuRef}
     className='absolute right-4 top-20 bg-white flex flex-col text-center h-fit w-36 border-2 rounded-md'>
      <Link  className='hover:bg-gray-300 transition-colors duration-500' to={"/user"}>
        <span>My profile</span></Link>
      <Link to={"/user"} className='hover:bg-gray-300 transition-colors duration-500'>
        <span >Orders</span></Link>
      <button onClick={()=>logOut()}><span className='hover:bg-gray-300 transition-colors duration-500 cursor-pointer'>
        Log Out</span></button>
      </div>}
    </div>
   
  )
}

export default Header
