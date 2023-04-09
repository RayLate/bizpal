import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

export interface CustomerData {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  region: string;
  isSeller: number;
  bookingCount: number;
  interest: string;
}

interface CustomerDataContextValue {
  customer: CustomerData | null;
  setCustomer: React.Dispatch<React.SetStateAction<CustomerData | null>>;
}

const CustomerDataContext = createContext<CustomerDataContextValue>({
  customer: null,
  setCustomer: () => {},
});

export const useCustomerData = () => useContext(CustomerDataContext)

export const CustomerDataProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const [customer, setCustomer] = useState<CustomerData | null>(null);
    return (
        <CustomerDataContext.Provider value={{customer, setCustomer}}>
        {children}
        </CustomerDataContext.Provider>
    );
};