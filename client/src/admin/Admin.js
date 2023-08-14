
import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="p-4 h-screen">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/admin/users" className="bg-blue-500 text-white py-4 px-6 rounded shadow hover:bg-blue-600">
          User Management
        </Link>
        <Link to='/admin/product/creation' className="bg-green-500 text-white py-4 px-6 rounded shadow hover:bg-green-600">
          Product Creation
        </Link>
        <Link to="/admin/orders" className="bg-yellow-500 text-white py-4 px-6 rounded shadow hover:bg-yellow-600">
          Order Management
        </Link>
        {/* Add more widgets, charts, etc. */}
      </div>
    </div>
  );
};

export default Admin;
