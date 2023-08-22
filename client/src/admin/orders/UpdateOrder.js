import React, { useState } from 'react';
import { newRequest } from '../../components/userAuth/newRequest';
import OrderDetailsOverlay from '../../components/Orders/OrderDetailsOverlay';
import OrderDetails from './OrderDetails';

const UpdateOrder = ({ orderId, onClose,getAllOrders }) => {
  const [deliveryStatus, updateDeliveryStatus] = useState('processing');
  const [viewOrders, setViewOrders] = useState(false);

  const handleDeliveryStatus = async () => {
    updateDeliveryStatus('Delivered');
    const reqObj = {
        "status":"Delivered"
    }
    await newRequest.put(`admin/orders/${orderId}`, reqObj);
    getAllOrders();
    onClose();
  };

  const deleteOrder = async () => {
    await newRequest.delete(`admin/order/${orderId}`);
    getAllOrders();
    onClose();
  };
  const viewOrder =  () => {
   setViewOrders(true)
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-full sm:w-96 shadow-md">
        <p>To view Order Details Click Below</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 mb-2"
          onClick={handleDeliveryStatus}
        >
          Update
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={viewOrder}
        >
          View
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          onClick={deleteOrder}
        >
          Delete Order
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
      {viewOrders &&<OrderDetails orderId = {orderId}onClose={onClose}/>}
    </div>
  );
};

export default UpdateOrder;
