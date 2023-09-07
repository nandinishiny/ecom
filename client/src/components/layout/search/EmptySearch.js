import React from 'react';
import { Link } from 'react-router-dom';

const EmptySearch = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">No products found !!</h2>
        <Link to={`/`} className="text-gray-500">Click here to back to home!</Link>
      </div>
    </div>
  );
};

export default EmptySearch;
