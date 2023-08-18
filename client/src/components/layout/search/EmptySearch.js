import React from 'react';

const EmptySearch = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">No products found !!</h2>
        <p className="text-gray-500">Click here to back to home!</p>
      </div>
    </div>
  );
};

export default EmptySearch;
