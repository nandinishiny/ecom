import React from 'react';

const IndividualUserDetails = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-full sm:w-96 shadow-md">
        <div className="flex items-center mb-4">
          <img
            src={user.avatar.url}
            alt={user.name}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-xl font-semibold mb-2">Role</h3>
          <p className="text-gray-600">{user.role}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-full text-sm font-semibold focus:outline-none">
          Back
        </button>
      </div>
    </div>
  );
};

export default IndividualUserDetails;
