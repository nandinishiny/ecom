// frontend/src/components/UserOrderPage.js
import React, { useEffect } from 'react';
import { newRequest } from '../userAuth/newRequest';

const dummyOrders = [
  {
    orderNumber: '353852',
    date: '8/12/23',
    shipTo: 'Nandini Divity',
    totalAmount: '₹178.00',
    status: 'Canceled',
  },
  {
    orderNumber: '353820',
    date: '8/12/23',
    shipTo: 'Nandini Divity',
    totalAmount: '₹178.00',
    status: 'Canceled',
  },
  {
    orderNumber: '348235',
    date: '7/11/23',
    shipTo: 'Nandini Divity',
    totalAmount: '₹607.00',
    status: 'Delivered',
  },
];

const UserOrderPage = () => {
  // const getMyOrders = async()=>{
  //   try {
  //     const response = await newRequest.post("/orders/me");
  //     console.log(response)
      
  //   } catch (error) {
  //     console.log(error)  
  //   }
  // }
  // useEffect(()=>{
  //   getMyOrders();
  // },[])

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await newRequest.get('/orders/me');
      console.log(response)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="p-4 h-screen">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 text-left">Order #</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Ship To</th>
              <th className="py-3 px-6 text-left">Order Total</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyOrders.map((order) => (
              <tr key={order.orderNumber} className="bg-white">
                <td className="py-3 px-6 ">{order.orderNumber}</td>
                <td className="py-3 px-6">{order.date}</td>
                <td className="py-3 px-6">{order.shipTo}</td>
                <td className="py-3 px-6">{order.totalAmount}</td>
                <td className="py-3 px-6">{order.status}</td>
                <td className="py-3 px-6">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-1">View Order</button>
                  <button className="bg-green-500 text-white px-2 py-1 rounded">Reorder</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4">{dummyOrders.length} Item(s)</p>
    </div>
  );
};

export default UserOrderPage;
