import { createContext, useContext, useState } from 'react';

const CustomerContext = createContext({
  data: {},
  setData: () => {},
});

export const CustomerProvider = ({ children }) => {
  const [data, setData] = useState({});

  const setDataValue = (key, value) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <CustomerContext.Provider value={{ data, setData: setDataValue }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => useContext(CustomerContext);
