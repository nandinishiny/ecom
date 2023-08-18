import React, { useState } from 'react';
import { newRequest } from '../../components/userAuth/newRequest';

const UpdateOrder = ({ orderId, onClose,getAllOrders }) => {
  const [deliveryStatus, updateDeliveryStatus] = useState('processing');

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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-full sm:w-96 shadow-md">
        <p>To update delivery status, click below:</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleDeliveryStatus}
        >
          Update
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
    </div>
  );
};

export default UpdateOrder;
