import React, { createContext, useContext, useState } from 'react';

interface BookingData {
  [key: string]: any;
}

interface BookingContextType {
  data: BookingData;
  setData: (data: BookingData) => void;
}

const BookingContext = createContext<BookingContextType>({
  data: {},
  setData: () => {},
});

export const BookingProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<BookingData>({});

  return (
    <BookingContext.Provider value={{ data, setData }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
