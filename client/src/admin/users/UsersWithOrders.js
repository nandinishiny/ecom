import React, { useEffect, useState } from 'react';
import { newRequest } from '../../components/userAuth/newRequest';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUserOrderData();
  }, []);

  const fetchUserOrderData = async () => {
    try {
    //   // Fetch user and order data from the backend
    //   const response = await newRequest.get('/admin/users-with-orders');
    //   const usersWithOrders = response.data.usersWithOrders;

    //   // Calculate ranks based on the number of orders
    //   const rankedUsers = usersWithOrders.sort((a, b) => b.numOrders - a.numOrders);

    //   setUsers(rankedUsers);
    } catch (error) {
      console.error('Error fetching user order data:', error);
    }
  };

  return (
    <div className="user-table-container p-6 bg-gray-100 rounded-lg shadow-md mx-auto w-fit min-h-screen">
      <h1 className="text-2xl font-bold mb-4">User Rankings by Orders</h1>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Orders</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.numOrders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
