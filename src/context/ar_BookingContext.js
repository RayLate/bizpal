import { createContext, useContext, useState } from 'react';

const BookingContext = createContext({
  data: {},
  setData: () => {},
});

export const BookingProvider = ({ children }) => {
  const [data, setData] = useState({});

  const setDataValue = (key, value) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <BookingContext.Provider value={{ data, setData: setDataValue }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
