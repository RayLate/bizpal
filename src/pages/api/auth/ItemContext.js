import { createContext, useContext, useState } from 'react';

const ItemContext = createContext({
  data: {},
  setData: () => {},
});

export const ItemProvider = ({ children }) => {
  const [data, setData] = useState({});

  const setDataValue = (key, value) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <ItemContext.Provider value={{ data, setData: setDataValue }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItem = () => useContext(ItemContext);
