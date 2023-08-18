import React, { useState } from 'react';
import Address from './Address'; // Assuming you have an Address component
import RajorPay from './RajorPay.js'
import { newRequest } from '../userAuth/newRequest';
import { useSelector } from 'react-redux';
import store from '../../redux/store';
import OrderSummary from './OrderSummary';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
    // const checkOutOrders = useSelector(store=>store.checkout.items);
const checkOutOrdersJSON = localStorage.getItem("checkoutDetails");
const checkOutOrders = checkOutOrdersJSON ? JSON.parse(checkOutOrdersJSON) : [];

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showPaymentOverlay, setShowPaymentOverlay] = useState(false);//to show payment form
  const defautAddress = {
    address: 'just fill',
    city: 'just fill',
    state: 'just fill',
    pinCode: '100000',
    country: 'india',
    phoneNumber: '1231231234',
  };
  const storedAddress = JSON.parse(localStorage.getItem('address')) || defautAddress;
  const [shippingAddress, setShippingAddress] = useState(storedAddress);

  const handleAddNewAddress = () => {
    setShowAddressForm(true);
  };

  const handleAddressFormClose = () => {
    setShowAddressForm(false);
  };

  const handleAddressFormSubmit = (newAddress) => {
    setShippingAddress(newAddress);
    setShowAddressForm(false);
  };
  //for fetching price
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productPrice = searchParams.get('price');
{/* Handling order*/}
const cleanOrderItems = checkOutOrders.map(item => {
  const name = item.name;
  const price = item.price;
  const quantity = 1;
  const img = item?.images[0]?.url 
  const product = item._id;  
  return { name, price, quantity, img, product };
});
  const handleOrder = async()=>{
    const reqObj ={
      shippingInfo : shippingAddress,
      orderItems:cleanOrderItems,
      paymentInfo:{
        id:"12345",
        status:"success"
      },
      itemsPrice:productPrice,
      taxPrice:0,
      shippingPrice:0,
      totalPrice:productPrice
    }
   
    try {
      const res = await newRequest.post('/order/new',reqObj);
     
      
    } catch (error) {
      console.log(error)
  
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen  p-4 flex justify-around">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96 pb-4 m-4 object-contain">

        {/*Address*/}

        <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
         <div className="border p-4 rounded mb-4">
          <p>{shippingAddress.address}</p>
          <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}</p>
          <p>{shippingAddress.country}</p>
          <p>Phone: {shippingAddress.phoneNumber}</p>
        </div>
        {showAddressForm ? (
          <Address onClose={handleAddressFormClose} onNext={handleAddressFormSubmit}  />
        ) : (
          <div className="mb-4">
            <button 
              onClick={handleAddNewAddress}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2 mb-4"
            >
              Add New Address
            </button>
           <button
              onClick={()=>setShowPayment(true)}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>


       {/* OrderSummary */}
      {showPayment && checkOutOrders.length !== 0 &&<div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96 pb-4 m-4 object-contain">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <OrderSummary items={checkOutOrders} />
      </div>}
      
       {/* Payment */}
       {showPayment &&<div>
        <RajorPay handleOrder = {handleOrder}/>
      </div>}
    </div>
  );
};

export default CheckoutPage;
