import React, { useEffect, useState } from 'react';

const PaymentCallbackPage = () => {
  const [ordersPageUrl, setOrdersPageUrl] = useState('');

  useEffect(() => {
    // Simulate a callback response
    const callbackResponse = {
      status: 'success',
      ordersPageUrl: `http://localhost1234/order/${orderId}`, // Example URL
    };

    // Handle the callback response and set the orders page URL
    if (callbackResponse.status === 'success') {
      setOrdersPageUrl(callbackResponse.ordersPageUrl);
    }
  }, []);

  useEffect(() => {
    // Redirect to the orders page URL once it's set
    if (ordersPageUrl) {
      window.location.href = ordersPageUrl;
    }
  }, [ordersPageUrl]);

  return (
    <div>
      <h1>Payment Callback Page</h1>
      <p>Redirecting to orders page...</p>
    </div>
  );
};

export default PaymentCallbackPage;
