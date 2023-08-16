import React from 'react';

const OrderSummaryItem = ({ item }) => {
  return (
    <div className="flex items-center mb-4 justify-around">
      <div className="w-16 h-16 rounded-lg overflow-hidden mr-4">
        <img src={item.images[0].url} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <p className="font-semibold">{item.name}</p>
        {item.quantity ?<p>Qty: {item.quantity}</p>:<p>Qty: 1</p>}
        <p>₹{item.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderSummaryItem;
