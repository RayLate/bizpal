import React from 'react';
import { useBooking } from './bookingContext';
import { fetchData } from './api';

const BookingComponent = () => {
  const { data, setData } = useBooking();

  const handleButtonClick = async () => {
    const url = 'https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/bookings';
    const httpMethod = 'GET';
    const response = await fetchData(url, httpMethod, data);
    console.log(response);
  };

  return (
    <div>
      {/* Additional UI for booking component */}
      <button onClick={handleButtonClick}>Send Booking Request</button>
    </div>
  );
};

export default BookingComponent;
