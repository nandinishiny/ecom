import React, { useEffect, useState } from 'react';
import { newRequest } from '../../components/userAuth/newRequest';
import UpdateOrder from './UpdateOrder';
import { setDriver } from 'mongoose';
import IndividualUserDetails from '../users/IndividualUserDetails';
import UserDetails from './UserDetails';

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId,setSelectedOrderId] = useState(null);
  const [viewUser,setViewUser] = useState(false);
  const [selectedUser,setSelectedUser] = useState(null);

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

  const onClose = ()=>{
    setSelectedOrderId(null)
  }
  const handleUpdate = (item)=>{
    setSelectedOrderId(item)
  }
  const userDetails = (user)=>{
    setViewUser(true)
    setSelectedUser(user)
  }
  const onUserClose = ()=>{
    setViewUser(false);
    setSelectedUser(null);
  }


  return (
    <div className="p-4 ">
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
            <th className="py-3 px-6 text-left">Update/Delete</th>
          </tr>
        </thead>
        <tbody>
          {reverseOrders.map((order) => (
            <tr key={order._id} className="bg-white">
              <td className="py-3 px-6 "><button>{order._id}</button></td>
              <td className="py-3 px-6 hover:underline cursor-pointer" onClick={()=>userDetails(order.user)}>{order.user}</td>
              {/* <td className="py-3 px-6">{order.orderItems[0].name}</td> */}
              <td className="py-3 px-6 ">{order.orderItems.map((item, index) => (
                  <div key={index}>{index+1} . {item.name}</div>))}</td>
              <td className="py-3 px-6">{order.orderItems.map((item, index) => (
                  <div key={index}> {item.quantity}</div>))}</td>
              <td className="py-3 px-6">{order.orderItems.map((item, index) => (
                  <div key={index}>{index+1} . {item.price}</div>))}</td>

              {/* <td className="py-3 px-6">{order.orderItems[0].quantity}</td> */}
              {/* <td className="py-3 px-6">{order.orderItems[0].price}</td> */}
              <td className="py-3 px-6">{order.totalPrice}</td>
              <td className="py-3 px-6">{order.taxPrice}</td>
              <td className="py-3 px-6">{order.shippingPrice}</td>
              <td className="py-3 px-6">{order.shippingInfo.address}</td>
              <td className="py-3 px-6">{order.createdAt}</td>
              <td className="py-3 px-6">{order.paymentInfo.status}</td>
              <td className="py-3 px-6">{order.orderStatus}</td>
              <td className="py-3 px-6"><button onClick={()=>handleUpdate(order._id)}>Update</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedOrderId && <div><UpdateOrder orderId = {selectedOrderId} onClose={onClose} getAllOrders = { getAllOrders} /></div>}
      {viewUser && <div><UserDetails  onClose={onUserClose} userId={selectedUser} /></div>}
    </div>
  );
};

export default AdminOrderManagement;
