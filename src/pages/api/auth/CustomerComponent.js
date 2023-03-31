import React from 'react';
import { useCustomer } from './customerContext';
import { fetchData } from './api';

const CustomerComponent = () => {
  const { data, setData } = useCustomer();
  //const [customerId, setCustomerId] = useState('');

  const handleButtonClick = async () => {
    const url = 'https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/users/';
    //url += customerId
    const httpMethod = 'GET';
    const response = await fetchData(url, httpMethod, data);
    console.log(response);
  };

  return (
    <div>
      {/* Additional UI for customer component */}
      <button onClick={handleButtonClick}>Send Customer Request</button>
    </div>
  );
};

export default CustomerComponent;
