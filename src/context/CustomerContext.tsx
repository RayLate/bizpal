import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from 'react';
import { sendAPICall } from './api';

export interface CustomerData {
  email: string;
  user: string;
  region: string;
  isSeller: number;
  bookingCount: number;
  interest: string;
}

export interface NewCustomerData {
  email: string;
  user: string;
}

interface CustomerDataContextValue {
  customer: CustomerData | null;
  setCustomer: React.Dispatch<React.SetStateAction<CustomerData | null>>;
  setSessionCustomer: React.Dispatch<
    React.SetStateAction<NewCustomerData | null>
  >;
  clearCustomer: () => void;
}

const CustomerDataContext = createContext<CustomerDataContextValue>({
  customer: null,
  setCustomer: () => {},
  setSessionCustomer: () => {},
  clearCustomer: () => {},
});

export const useCustomerData = () => useContext(CustomerDataContext);

export const CustomerDataProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [sessionCustomer, setSessionCustomer] =
    useState<NewCustomerData | null>(null);

  function clearCustomer() {
    setCustomer(null);
  }

  useEffect(() => {
    if (!sessionCustomer || !sessionCustomer.email) return;
    const getCustomer = async () => {
      const url = `https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/users/${sessionCustomer.email}`;
      const httpMethod = 'GET'; // Replace with your desired HTTP method
      const response = await sendAPICall({ url, httpMethod });
      return response;
    };
    const createCustomer = async () => {
      console.log('Creating Account');
      const url = `https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/users`;
      const httpMethod = 'POST';
      const data = {
        userId: sessionCustomer.email,
        email: sessionCustomer.email,
        user: sessionCustomer.user,
        region: 'Singapore',
        isSeller: 0,
        bookingCount: 0,
        interest: '',
      };
      const response = await sendAPICall({ url, httpMethod, data });
      return response;
    };
    getCustomer()
      .then((response) => {
        console.log(response);

        if (response.email) {
          setCustomer(response);
          return null;
        } else {
          return createCustomer();
        }
      })
      .then((response) => {
        if (response) {
          console.log(response);
          setCustomer(response);
        }
      });
  }, [sessionCustomer]);

  return (
    <CustomerDataContext.Provider
      value={{ customer, setCustomer, clearCustomer, setSessionCustomer }}
    >
      {children}
    </CustomerDataContext.Provider>
  );
};
