import React from 'react';
import { useItem } from './itemContext';
import { sendAPICall } from './api';

const ItemComponent = () => {
  const { data, setData } = useItem();

  const handleButtonClick = async () => {
    const url = 'https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/items';
    const httpMethod = 'GET';
    const response = await sendAPICall(url, httpMethod, data);
    console.log(response);
  };

  return (
    <div>
      {/* Additional UI for item component */}
      <button onClick={handleButtonClick}>Send Item Request</button>
    </div>
  );
};

export default ItemComponent;

