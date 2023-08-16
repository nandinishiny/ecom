import React, { useEffect, useState } from 'react';
import { newRequest } from '../../components/userAuth/newRequest';

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    try {
      const response = await newRequest.get('/admin/orders');
      setOrders(response?.data?.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  const reverseOrders = [...orders].reverse();


  return (
    <div className="p-4 h-screen">
      <h2 className="text-2xl font-semibold mb-4">Order Management</h2>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-6 text-left">Order Id</th>
            <th className="py-3 px-6 text-left">User</th>
            <th className="py-3 px-6 text-left">Product Name</th>
            <th className="py-3 px-6 text-left">Quantity</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-left">Total Price</th>
            <th className="py-3 px-6 text-left">Tax Price</th>
            <th className="py-3 px-6 text-left">Shipping Price</th>
            <th className="py-3 px-6 text-left">Address</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Payment Status</th>
            <th className="py-3 px-6 text-left">Delivery Status</th>
          </tr>
        </thead>
        <tbody>
          {reverseOrders.map((order) => (
            <tr key={order._id} className="bg-white">
              <td className="py-3 px-6">{order._id}</td>
              <td className="py-3 px-6">{order.user}</td>
              <td className="py-3 px-6">{order.orderItems[0].name}</td>
              <td className="py-3 px-6">{order.orderItems[0].quantity}</td>
              <td className="py-3 px-6">{order.orderItems[0].price}</td>
              <td className="py-3 px-6">{order.totalPrice}</td>
              <td className="py-3 px-6">{order.taxPrice}</td>
              <td className="py-3 px-6">{order.shippingPrice}</td>
              <td className="py-3 px-6">{order.shippingInfo.address}</td>
              <td className="py-3 px-6">{order.createdAt}</td>
              <td className="py-3 px-6">{order.paymentInfo.status}</td>
              <td className="py-3 px-6">{order.orderStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderManagement;
