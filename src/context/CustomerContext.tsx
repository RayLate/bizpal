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

export interface Business {
  bizId: string;
  businessAddress: string;
  businessCreateTime: string;
  businessDescription: string;
  businessEmail: string;
  businessName: string;
  businessPhoneNumber: string;
  businessRegistrationNumber: string;
}

interface CustomerDataContextValue {
  customer: CustomerData | null;
  business: Business[] | null;
  setCustomer: React.Dispatch<React.SetStateAction<CustomerData | null>>;
  setSessionCustomer: React.Dispatch<
    React.SetStateAction<NewCustomerData | null>
  >;
  clearCustomer: () => void;
}

const CustomerDataContext = createContext<CustomerDataContextValue>({
  customer: null,
  business: null,
  setCustomer: () => {},
  setSessionCustomer: () => {},
  clearCustomer: () => {},
});

export const useCustomerData = () => useContext(CustomerDataContext);

export const CustomerDataProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [business, setBusiness] = useState<Business[] | null>(null);
  const [sessionCustomer, setSessionCustomer] =
    useState<NewCustomerData | null>(null);

  function clearCustomer() {
    setBusiness(null);
    setCustomer(null);
  }

  useEffect(() => {
    let isMounted = true;
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
    const getBiz = async ({ user }: { user: string }) => {
      const url = `https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/bizs/?userId=${user}`;
      const httpMethod = 'GET';
      const response = await sendAPICall({ url, httpMethod });

      const biz = response.map((b: any) => ({ ...b.attr, bizId: b.bizId }));
      console.log(biz);
      setBusiness(biz);
      return response;
    };
    getCustomer()
      .then((response) => {
        console.log(response);
        if (response.isSeller === 1 && isMounted) {
          getBiz({ user: response.email });
        }

        if (response.email) {
          setCustomer(response);
          return null;
        } else {
          return createCustomer();
        }
      })
      .then((response) => {
        if (response && isMounted) {
          console.log(response);

          setCustomer(response);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [sessionCustomer]);

  return (
    <CustomerDataContext.Provider
      value={{
        customer,
        business,
        setCustomer,
        clearCustomer,
        setSessionCustomer,
      }}
    >
      {children}
    </CustomerDataContext.Provider>
  );
};
