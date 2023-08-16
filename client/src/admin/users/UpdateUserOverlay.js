import React, { useState } from 'react';
import { newRequest } from '../../components/userAuth/newRequest';

const UpdateUserOverlay = ({ user, onClose }) => {
  const [updatedName, setUpdatedName] = useState(user.name);
  const [updatedRole, setUpdatedRole] = useState(user.role);

  const handleUpdate = async() => {
    const updatedData = {
        name: updatedName,
        role: updatedRole
      };
    try {
        await newRequest.put(`/admin/user/${user._id}`,updatedData)
        onClose(); // Close the overlay after successful deletion
      } catch (error) {
        console.error('Error deleting user:', error);
        // Handle the error
      }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-full sm:w-96 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Update User</h2>
        <div className="form-group mb-3">
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="role" className="block font-medium mb-1">
            Role
          </label>
          <input
            type="text"
            id="role"
            className="form-input"
            value={updatedRole}
            onChange={(e) => setUpdatedRole(e.target.value)}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 mr-2 bg-gray-300 hover:bg-gray-400 rounded-full text-sm font-semibold focus:outline-none"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-semibold focus:outline-none"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserOverlay;







// import React, { useState } from 'react';

// const UpdateUserOverlay = ({ user, onClose }) => {
//   const [updatedName, setUpdatedName] = useState(user.name);
//   const [updatedRole, setUpdatedRole] = useState(user.role);

//   const handleUpdate = () => {
//     // Perform the update action using the updatedName and updatedRole
//     // You can call an API here to update the user's name and role
//     // After successful update, you can close the overlay

//     onClose(); // Close the overlay after update
//   };

//   return (
//     <div className="overlay">
//       <div className="overlay-content">
//         <h2 className="text-lg font-semibold mb-4">Update User</h2>
//         <div className="form-group mb-3">
//           <label htmlFor="name" className="block font-medium mb-1">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             className="form-input"
//             value={updatedName}
//             onChange={(e) => setUpdatedName(e.target.value)}
//           />
//         </div>
//         <div className="form-group mb-3">
//           <label htmlFor="role" className="block font-medium mb-1">
//             Role
//           </label>
//           <input
//             type="text"
//             id="role"
//             className="form-input"
//             value={updatedRole}
//             onChange={(e) => setUpdatedRole(e.target.value)}
//           />
//         </div>
//         <div className="flex justify-end mt-4">
//           <button
//             className="px-4 py-2 mr-2 bg-gray-300 hover:bg-gray-400 rounded-full text-sm font-semibold focus:outline-none"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-semibold focus:outline-none"
//             onClick={handleUpdate}
//           >
//             Update
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateUserOverlay;
