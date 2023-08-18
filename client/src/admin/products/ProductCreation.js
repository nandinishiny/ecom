
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCreation = () => {
  return (
    <div className="p-4 h-screen">
      <h2 className="text-2xl font-semibold mb-4"> Products --Admin</h2>
      <div className="grid grid-cols-2 gap-4">
        <Link to='/admin/product/new' className="bg-blue-500 text-white py-4 px-6 rounded shadow hover:bg-blue-600">
          Create new Product
        </Link>
      </div>
     
      <div className="grid grid-cols-2 gap-4 mt-12">
        <Link to='/products' className="bg-red-400 text-white py-4 px-6 rounded shadow hover:bg-blue-600">
          For updating and Deleting the product you can visit product details page itself.
          click here or search above
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Link to='/corousel/upload' className="bg-blue-500 text-white py-4 px-6 rounded shadow hover:bg-blue-600 mt-4">
          For uploading Corousel Items
        </Link>
      </div>
    </div>
  );
};

export default ProductCreation;
