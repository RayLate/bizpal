import React from 'react';
import { useBiz } from './bizContext';
import { fetchData } from './api';

const BizComponent = () => {
  const { data, setData } = useBiz();

  const handleButtonClick = async () => {
    const url = 'https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/bizs?';
    const httpMethod = 'GET';
    const response = await fetchData(url, httpMethod, data);
    console.log(response);
  };

  return (
    <div>
      {/* Additional UI for biz component */}
      <button onClick={handleButtonClick}>Send Biz Request</button>
    </div>
  );
};

export default BizComponent;

