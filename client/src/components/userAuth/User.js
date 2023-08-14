import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import picnew from '../../assets/picenter.png'
import axios from 'axios';
import { newRequest } from './newRequest';
const User = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [email,setEmail] = useState(user.email);
  const [userName,setUserName] = useState(user.name);
  const [image,setImage] = useState(user.avatar);
  const updateProfile = async(e)=>{
    e.preventDefault();
        try {
            const formData = {};
            formData.name = userName;
            formData.email = email;
            formData.avatar = image;
            await newRequest.put("/me/update",formData);
            console.log(formData);
            alert("updated successfully");
            // Remove existing user data from localStorage
            localStorage.removeItem("currentUser");

            // Store updated user data in localStorage
            const updatedUserData = {
                ...user,
                name: formData.name,
                email: formData.email,
                avatar: formData.avatar,
            };
            localStorage.setItem("currentUser", JSON.stringify(updatedUserData));
            navigate("/user")
        } catch (error) {
            console.log(error);
            
        }

  }
  const handleImage = async(e)=>{
    const file = e.target.files[0];     
    try {
        const formData = new FormData();
        formData.append('file',file);
        formData.append('upload_preset', 'ecomandcohome');
        formData.append('folder', 'ecomandco');
        const res = await axios.post(
            'https://api.cloudinary.com/v1_1/ecomandco/image/upload',
            formData
          );
          alert("Image is uploaded successfully");
          const imageObject = {
            public_id:res.data.public_id,
            url:res.data.secure_url
          }
          setImage(imageObject);
         
    } catch (error) {
        console.log(error);
        
    }
}
  return (
    <div className='flex justify-center h-screen w-full'>
      <div className='flex flex-col m-4 gap-4 w-1/2'>
        <input type="text" 
        value={userName}
        onChange={(e)=>setUserName(e.target.value)}
        className='border-b-2 border-gray-300 outline-none w-fit ' />
        <input type="email" 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className='border-b-2 border-gray-300 outline-none '  />
        <label htmlFor="pic"><img src={picnew} alt="" /></label>
        <input type="file"
        id='pic' hidden
        onChange={handleImage} />
        <img src={image.url} alt=""
        className='w-40 h-fit' />
        <button 
        className='bg-green-500 text-white font-bold w-40  p-2'
        onClick={updateProfile} >Update Profile</button>
      </div>
    </div>
  )
}

export default User