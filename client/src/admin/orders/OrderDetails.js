import React, { useEffect, useState } from 'react';
import { newRequest } from '../../components/userAuth/newRequest';

const OrderDetails = ({ orderId, onClose }) => {
    const [order,setOrder] = useState('')
    useEffect(()=>{
        getOrder();
    },[])
    const getOrder = async()=>{
        const res = await newRequest.get(`http://localhost:3000/api/v1/order/${orderId}`)
        setOrder(res.data.order)

    }
    if(!order){
        return(<div>Wait</div>)
    }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-full sm:w-96 shadow-md">
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-semibold">Order Details</h2>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-xl font-semibold mb-2">Order ID</h3>
          <p className="text-gray-600">{order._id}</p>
          <h3 className="text-xl font-semibold mt-4">Date</h3>
          <p className="text-gray-600">{order.createdAt}</p>
          <h3 className="text-xl font-semibold mt-4">Products</h3>
          <ul className="text-gray-600">
            {order.orderItems.map(product => (
              <li key={product._id}>{product.name} - {product.quantity} x ₹{product.price}</li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mt-4">Total</h3>
          <p className="text-gray-600">₹{order.totalPrice}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-full text-sm font-semibold focus:outline-none">
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
