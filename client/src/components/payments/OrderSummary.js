import React from 'react';
import OrderSummaryItem from './OrderSummaryItem';

const OrderSummary = ({ items }) => {

  const calculateTotalPrice = () => {
    return items?.reduce(
      (total, item) => total + item.price,0)};

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      {items?.map((item, index) => (
        <OrderSummaryItem key={index} item={item} />
      ))}
      <div className="mt-4">
      <h4 className=" text-md">Shipping Price: Free</h4>
        <h4 className="font-semibold text-lg">Total Price: ₹{calculateTotalPrice().toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default OrderSummary;

















 