import React, { createContext, useContext, useState } from 'react';

interface CustomerData {
  [key: string]: any;
}

interface CustomerContextType {
  data: CustomerData;
  setData: (data: CustomerData) => void;
}

const CustomerContext = createContext<CustomerContextType>({
  data: {},
  setData: () => {},
});

export const CustomerProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<CustomerData>({});

  return (
    <CustomerContext.Provider value={{ data, setData }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => useContext(CustomerContext);
