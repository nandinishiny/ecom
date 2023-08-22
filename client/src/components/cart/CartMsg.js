//this page is to send message when an element is added.
import React, { useEffect, useState } from 'react';

const CartMessage = ({ message,progressCount,decrement,steps }) => {
  const [progress, setProgress] = useState(progressCount);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => prevProgress - decrement);
    }, steps);

    setTimeout(() => {
      clearInterval(timer);
    }, 2000); // Remove after 2 seconds

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 w-fit p-4 bg-green-200">
      <p className='font-bold'>{message}</p>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500" 
      style={{ width: `${progress}%` }} />
    </div>
  );
};

export default CartMessage;
