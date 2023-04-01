import React, { useState } from 'react';
import { useBooking } from './BookingContext';
import { sendAPICall } from './api';

const BookingComponent: React.FC = () => {
  const { data, setData } = useBooking();
  // Add any additional state variables and UI elements you need

  const handleButtonClick = async () => {
    const url = 'https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/bookings';
    const httpMethod = 'GET'; // Replace with your desired HTTP method
    const response = await sendAPICall(url, httpMethod, data);
    console.log(response);
  };

  return (
    <div>
      {/* Render your UI components here */}
      <button onClick={handleButtonClick}>Send Request</button>
    </div>
  );
};

export default BookingComponent;
