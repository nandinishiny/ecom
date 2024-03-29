import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import picnew from '../../assets/picenter.png';
import axios from 'axios';
import { newRequest } from './newRequest';
import CartMessage from '../cart/CartMsg';


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [imagePreview,setImagePreview] = useState("");
    const [image,setImage] = useState(null);

    const [showPassword, setShowPassword] = useState(false);
    
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [imageError, setImageError] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const isPasswordVisible = () => {
        setShowPassword(!showPassword);
    }

    const handleImage = async (e) => {
        const file = e.target.files[0];
        setImage(file)
        if (!file) {
            setImageError('Please upload a file');
            return; // Return early if no file is selected
        }
        else {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
             setImagePreview(reader.result)
            }
            setImageError(""); 
          }
    }

    const registerUser = async (e) => {
        e.preventDefault();

        // Reset previous error messages
        setNameError("");
        setEmailError("");
        setPasswordError("");

        try {
            const formData = new FormData();
            formData.append('name',userName);
            formData.append('email',email);
            formData.append('password', password);
            formData.append('avatar', image);

            if (!userName) {
                setNameError("Please enter your name");
            }

            if (!email) {
                setEmailError("Please enter your email");
            }

            if (!password) {
                setPasswordError("Please enter your password");
            }
            
            if (!image) {
                setImageError("Please enter image");
            }

            if (userName && email && password) {
                setMsg("Wait few seconds !")
                // Proceed with registration
                await newRequest.post("/register", formData);
                navigate("/login");
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className=' mt-10 flex justify-center h-screen '>
            <form className='flex flex-col items-start w-1/2'
                onSubmit={registerUser} method='post'>
                <h1 className='m-2 text-xl font-bold'>SignUp Here</h1>
                <input
                    type="text"
                    placeholder='Please enter your name'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className='border border-gray-400 outline-none w-1/2 p-2 m-2 rounded-md'
                    autoFocus />
                {nameError && <span className="text-red-500">{nameError}</span>}

                <input
                    type="email"
                    placeholder='Please enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border border-gray-400 outline-none w-1/2 p-2 m-2 rounded-md'
                    name='email'
                />
                {emailError && <span className="text-red-500">{emailError}</span>}

                <div className='flex items-center  w-1/2 border border-gray-400 p-2 m-2 rounded-md'>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        placeholder='Please enter Password'
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-11/12 outline-none' />
                    <div onClick={() => isPasswordVisible()}>
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </div>
                </div>
                {passwordError && <span className="text-red-500">{passwordError}</span>}

                <span className='font-bold'>upload profile pic below</span>
                <label htmlFor="pic"><img src={picnew} alt="" /></label>
                <input type="file" id='pic' className='hidden' onChange={handleImage} />
                {imageError && <span className="text-red-500">{imageError}</span>}

                <button
                    className='m-2 border p-2 rounded-md bg-red-300 hover:bg-red-400'
                    type='submit'>SignUp</button>

                <div>
                    <p>Already have an account!! Click here
                        <Link to='/login' className='font-bold p-2 underline m-2'>Log in</Link>
                    </p>
                    {image && <img src={imagePreview} alt="" className='h-32 object-contain' />}
                </div>
                {msg && <CartMessage message={msg}progressCount={100}decrement={1} steps={100} />}
            </form>
        </div>
    )
}

export default SignUp;

















