// frontend/src/components/UserOrderPage.js
import React, { useEffect, useState } from 'react';
import { newRequest } from '../userAuth/newRequest';
import OrderDetailsOverlay from './OrderDetailsOverlay';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCheckOut } from '../../redux/CheckoutOrderSlice';


const UserOrderPage = () => {
  const [userOrders,setUserOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();

  const handleOpenOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };
  const getMyOrders = async()=>{
    try {
      const response = await newRequest.post("/orders/me");
      const reverseOrders = response?.data?.orders
      setUserOrders([...reverseOrders].reverse());
      
    } catch (error) {
      console.log(error)  
    }
  }
  useEffect(()=>{
    getMyOrders();
  },[])
  {/*Dispatch to reorder*/}
 
    const checkOutToStore = (items)=>{
     const arr = items.map((item,index)=>{
      return {...item,images:[{url:item.img}]}
     })
      dispatch(addToCheckOut(arr));
    }
  
  const extractDate = (totalTimeString) => {
    const datetimeObj = new Date(totalTimeString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dateString = datetimeObj.toLocaleDateString('en-US', options);
    return dateString;
  };
  return (
    <div className="p-4 h-screen">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 ">Order #</th>
              <th className="py-2 ">Items</th>
              <th className="py-2">Date</th>
              <th className="py-2">Order Total</th>
              <th className="py-2">Status</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody >
            {userOrders.map((order) => (
              <tr key={order._id} className="bg-white">
                <td className="py-3 px-6 ">{order._id}</td>
                <td className="py-3 px-6 ">{order.orderItems.map((item, index) => (
                  <div key={index}>{index+1} . {item.name}</div>))}</td>
                <td className="py-3 px-6">{extractDate(order.createdAt)}</td>
                <td className="py-3 px-6">{order.totalPrice}</td>
                <td className="py-3 px-6">{order.orderStatus}</td>
                <td className="py-3 px-6">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
                  onClick={()=>handleOpenOrderDetails(order)}>View Order</button>
                  <Link to={`/payment?price=${order.totalPrice}`}><button className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={()=>checkOutToStore(order.orderItems)} >Reorder</button></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4">{userOrders.length} Item(s)</p>
      {selectedOrder &&<OrderDetailsOverlay order={selectedOrder} onClose={handleCloseOrderDetails}/>}
    </div>
  );
};

export default UserOrderPage;
