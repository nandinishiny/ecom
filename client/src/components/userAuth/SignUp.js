import React, { useState } from 'react'
import {AiOutlineEyeInvisible} from 'react-icons/ai'
import {AiOutlineEye} from 'react-icons/ai'
import {Link, useNavigate} from 'react-router-dom'
import picnew from '../../assets/picenter.png'
import axios from 'axios'
import { newRequest } from './newRequest'
const SignUp = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [userName,setUserName] = useState("");
    const [showPassword,setShowPassword]=useState(false);
    const [profilePic,setProfilePic]=useState(null);
    const isPasswordVisible =()=>{
        setShowPassword(!showPassword);
    }
    const [image,setImage] = useState({});
    const navigate = useNavigate();
    const handleImage = async(e,index)=>{
        const file = e.target.files[0];
        // const reuploadImages = [];     
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
              console.log(imageObject.url);
        } catch (error) {
            console.log(error);
            
        }

    }
    const registerUser= async(e)=>{
        e.preventDefault();
        try {
            const formData = {};
            formData.name = userName;
            formData.email=email;
            formData.password = password;
            formData.avatar = image;
            await newRequest.post("/register",formData);
            console.log(formData.avatar.url);
            console.log(formData);
            alert("signedup successfully");
            navigate("/login")
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div className=' mt-10 flex justify-center  h-screen '>
        <form className='flex flex-col items-start w-1/2'
        onSubmit={registerUser} method='post'>
            <h1 className='m-2 text-xl font-bold'>SignUp Here</h1>
            <input
             type="text"
             placeholder='Please enter your name'
             value={userName} 
             onChange={(e)=>setUserName(e.target.value)}
             className='border border-gray-400 outline-none w-1/2 p-2 m-2 rounded-md' 
             autoFocus />
            <input
             type="email"
             placeholder='Please enter your email'
             value={email} 
             onChange={(e)=>setEmail(e.target.value)}
             className='border border-gray-400 outline-none w-1/2 p-2 m-2 rounded-md' 
             name='email'
              />
            <div className='flex items-center  w-1/2 border border-gray-400 p-2 m-2 rounded-md'>
                <input
                 type={showPassword?"text":"password"} 
                 value={password}
                 placeholder='Please enter Password'
                 onChange={(e)=>setPassword(e.target.value)}
                 className='w-11/12 outline-none' />
                <div onClick={()=>isPasswordVisible()}>
                    {showPassword?<AiOutlineEyeInvisible />:<AiOutlineEye/>}
                </div>
            </div>
            <span className='font-bold'>upload profile pic below</span>
            <label htmlFor="pic"><img src={picnew} alt="" /></label>
            <input type="file" id='pic' className='hidden' onChange={handleImage}/>
            <button 
            className='m-2 border p-2 rounded-md bg-red-300 hover:bg-red-400'
            type='submit'> SignUp</button>
            <div>
                <p>Already have an accont !! click here
                <Link to='/login'className='font-bold p-2 underline m-2'>Log in </Link></p> 
            </div>
        </form>
    </div>
  )
}

export default SignUp