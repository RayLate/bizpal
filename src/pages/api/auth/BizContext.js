import { createContext, useContext, useState } from 'react';

const BizContext = createContext({
  data: {},
  setData: () => {},
});

export const BizProvider = ({ children }) => {
  const [data, setData] = useState({});

  const setDataValue = (key, value) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <BizContext.Provider value={{ data, setData: setDataValue }}>
      {children}
    </BizContext.Provider>
  );
};

export const useBiz = () => useContext(BizContext);
