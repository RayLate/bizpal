import React, { createContext, useContext, useState } from 'react';

interface ItemData {
  [key: string]: any;
}

interface ItemContextType {
  data: ItemData;
  setData: (data: ItemData) => void;
}

const ItemContext = createContext<ItemContextType>({
  data: {},
  setData: () => {},
});

export const ItemProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ItemData>({});

  return (
    <ItemContext.Provider value={{ data, setData }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItem = () => useContext(ItemContext);
