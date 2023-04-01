import React, { useState, useEffect } from 'react';
import { useCustomer } from './CustomerContext';
import { sendAPICall } from './api';

const CustomerComponent: React.FC = () => {
  const { data, setData } = useCustomer();
  const [customerId, setCustomerId] = useState('');

  useEffect(() => {
    const fetchDataWhenCustomerIdChanges = async () => {
      if (customerId) {
        const url = `https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/users/${customerId}`;
        const httpMethod = 'GET'; // Replace with your desired HTTP method
        const response = await sendAPICall(url, httpMethod, data);
        console.log(response);
      }
    };

    fetchDataWhenCustomerIdChanges();
  }, [customerId, data]);

  const handlePostButtonClick = async () => {
    const url = 'https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/users/'; // Update with your desired URL
    const httpMethod = 'POST';
    const response = await sendAPICall(url, httpMethod, data);
    console.log(response);
  };

  // Add any additional state variables and UI elements you need

  return (
    <div>
      {/* Render your UI components here */}
      <input
        type="text"
        placeholder="Enter Customer ID"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      <button onClick={handlePostButtonClick}>Send POST Request</button>
      {/* Add more UI elements as needed */}
    </div>
  );
};

export default CustomerComponent;
