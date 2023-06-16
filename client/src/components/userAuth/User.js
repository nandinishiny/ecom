import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/userSlice';
import {  useCookies } from 'react-cookie'
import axios from 'axios';
import { newRequest } from './newRequest';

const User = () => {
  const [userOne,setUserOne] = useState('');
    const dispatch= useDispatch();
    useEffect(()=>{
        getUserDetails();
    },[]);
      
    const getUserDetails=async()=>{
        const data= await newRequest.get("/me");
        dispatch(getUser(data.data.user));
        setUserOne( data.data.user);


    }
    const user= useSelector(store=>store.user.user)
  return (
    <div>{user.name}</div>
  )
}

export default User