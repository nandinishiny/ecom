import React, { useEffect, useState } from 'react';
import { newRequest } from '../../components/userAuth/newRequest';
import {IoMdPrint} from 'react-icons/io'
import IndividualUserDetails from './IndividualUserDetails'; // Import the user details component
import UpdateUserOverlay from './UpdateUserOverlay'; // Import the update user overlay component
import DeleteUserOverlay from './DeleteUserOverlay'; // Import the delete user overlay component

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await newRequest.get('/admin/users');
      setUsers(response?.data?.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleProfileClick = (user) => {
    setSelectedUser(user);
    setSelectedAction('profile');
  };

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setSelectedAction('update');
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setSelectedAction('delete');
  };

  const handleCloseOverlay = () => {
    setSelectedUser(null);
    setSelectedAction(null);
  };

  return (
    <div className="user-list-container p-6 bg-gray-100 rounded-lg shadow-md mx-auto w-fit min-h-screen">
      {/*For printing*/}
      <label htmlFor="print" className='absolute top-26 right-40 cursor-pointer'><IoMdPrint
      className='text-2xl'/></label>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
        absolute right-4 top-24 cursor-pointer"
        id='print'
        onClick={() => window.print()}>
        Print User List
      </button>
      {/*table*/}
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <table className="table-auto w-full">
      <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Click to see Profile</th>
            <th className="px-4 py-2 text-left">Click to update</th>
            <th className="px-4 py-2 text-left">Click to Delete</th>
          </tr>
        </thead>
        {/* Table body*/}
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className={`${
                user.role === 'admin' ? 'bg-blue-100' : 'bg-green-100'
              } hover:bg-gray-200`}
            >
              <td className="px-4 py-2">{user._id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td
                className="px-4 py-2 cursor-pointer text-blue-500 hover:underline"
                onClick={() => handleProfileClick(user)}
              >
                Profile
              </td>
              <td
                className="px-4 py-2 cursor-pointer text-green-500 hover:underline"
                onClick={() => handleUpdateClick(user)}
              >
                Update
              </td>
              <td
                className="px-4 py-2 cursor-pointer text-red-500 hover:underline"
                onClick={() => handleDeleteClick(user)}
              >
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedAction === 'profile' && (
        <IndividualUserDetails
          user={selectedUser}
          onClose={handleCloseOverlay}
        />
      )}
      {selectedAction === 'update' && (
        <UpdateUserOverlay
          user={selectedUser}
          onClose={handleCloseOverlay}
        />
      )}
      {selectedAction === 'delete' && (
        <DeleteUserOverlay
          user={selectedUser}
          onClose={handleCloseOverlay}
        />
      )}
    </div>
  );
};

export default UserList;















