import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { newRequest } from './newRequest';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/userSlice';
import CartMessage from '../cart/CartMsg';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCredentials, setShowCredentials] = useState(false);

    const [msg, setMsg] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [err, setErr] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset previous error messages
        setEmailError("");
        setPasswordError("");

        try {
            setMsg("Wait a few Seconds")
            const res = await newRequest.post("/login", {
                email,
                password
            });
            window.localStorage.setItem("currentUser", JSON.stringify(res.data.user));
            dispatch(getUser(res.data.user));
            navigate("/");

        } catch (error) {
            console.log(error);
            setErr("Invalid email or password");
        }
    }

    const handlePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        
        <div className=' mt-10 flex justify-center h-screen'>
            <form className='flex flex-col items-start w-1/2'
                onSubmit={handleSubmit} method='post'>
                <h1 className='m-2 text-xl font-bold'>Login Here</h1>
                <input
                    type="email"
                    placeholder='Please enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border border-gray-400 outline-none w-1/2 p-2 m-2 rounded-md'
                    autoFocus />
                {emailError && <span className="text-red-500">{emailError}</span>}

                <div className='flex items-center  w-1/2 border border-gray-400 p-2 m-2 rounded-md'>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        placeholder='Please enter Password'
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-11/12 outline-none' />
                    <div onClick={() => handlePassword()}>
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </div>
                </div>
                {passwordError && <span className="text-red-500">{passwordError}</span>}
                {err && <span className="text-red-500">{err}</span>}

                <button
                    className='m-2 border p-2 rounded-md bg-red-300 hover:bg-red-400'
                    type='submit'>Login</button>

                <div>
                    <p>Don't have an account yet! Click here
                        <Link to='/signup' className='font-bold p-2 underline m-2'>Sign up</Link>
                    </p>
                </div>
                {msg && <CartMessage message={msg} progressCount={100}decrement={2} steps={50}/>}
            </form>
            <div>
                <p className='font-bold'>Want to login as admin ?</p>
                <button onClick={()=>setShowCredentials(true)} className='bg-blue-300 p-2 rounded-sm'>Yes</button>
                {showCredentials && <><p>Login with these details</p>
                <p className='font-bold'>Gmail:    admin.test@gmail.com </p>
                <p className='font-bold'>Password:   admin@123 </p>
                <button onClick={()=>setShowCredentials(false)} className='bg-blue-300 p-2 rounded-sm'>Cancle</button>
                </>}
            </div>
        </div>
    )
}

export default Login;
