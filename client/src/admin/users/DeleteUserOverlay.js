import React from 'react';
import { newRequest } from '../../components/userAuth/newRequest';

const DeleteUserOverlay = ({ user, onClose,getUsers }) => {
  const handleDelete = async () => {
    try {
      await newRequest.delete(`/admin/user/${user._id}`)
      getUsers();
      onClose(); // Close the overlay after successful deletion
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle the error
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-full sm:w-96 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete {user.name}?</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 bg-gray-300 hover:bg-gray-400 rounded-full text-sm font-semibold focus:outline-none"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-semibold focus:outline-none"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserOverlay;





// import React from 'react';


// const DeleteUserOverlay = ({ user, onClose }) => {
//   const handleDelete = async () => {
//     try {
//       // Perform delete API call using the deleteUser function
//       await deleteUser(user._id);
//       onClose(); // Close the overlay after successful deletion
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       // Handle the error
//     }
//   };

//   return (
//     <div className="overlay">
//       <div className="overlay-content">
//         {/* ... Delete user confirmation ... */}
//         <button className="back-button" onClick={onClose}>
//           Cancel
//         </button>
//         <button className="delete-button" onClick={handleDelete}>
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DeleteUserOverlay;
