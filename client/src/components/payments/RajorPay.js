import React, { useState } from 'react';
import { newRequest } from '../userAuth/newRequest';
import { useLocation } from 'react-router-dom';
import Razorpay from 'razorpay';

const PaymentComponent = ({handleOrder}) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productPrice = searchParams.get('price');
    const initiatePayment = async (e) => {
        e.preventDefault();
        const obj = {};
        obj.amount = productPrice
        try {
            const {data:{key}} = await newRequest.get('/getkey');
            const user = await newRequest.get('/me');
            const {data:{order}} = await newRequest.post('/checkout',obj);
            var options = {
                key, // Enter the Key ID generated from the Dashboard
                amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "Ecom ",
                description: " Transaction Details",
                image: "https://www.simicart.com/blog/wp-content/uploads/eCommerce-logo-1.jpg",
                order_id:order.id , //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                callback_url: "http://localhost:3000/razorpay-callback",
                prefill: {
                    name: user.data.user.name,
                    email: user.data.user.email,
                    contact: "6304447577"
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#3399cc"
                }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
            
        } catch (error) {
            console.log(error)
            
        }

        // Additional data for creating the order on the server
        }
        const handleButtonClick = (e)=>{
            initiatePayment(e);
            handleOrder();
        }

  return (
    <div >
        <div className='h-screen flex flex-col items-center '>
            <img src="https://cdn.razorpay.com/logo.png" alt="" 
            className='m-4' />
        <button 
            onClick={handleButtonClick}
        // onClick={initiatePayment}
        className='bg-pink-600 p-2 m-2 rounded-md font-bold text-white'>Pay With RazorPay</button>
        </div>
    </div>
  );
};

export default PaymentComponent;