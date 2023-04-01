import React, { createContext, useContext, useState } from 'react';

interface BizData {
  [key: string]: any;
}

interface BizContextType {
  data: BizData;
  setData: (data: BizData) => void;
}

const BizContext = createContext<BizContextType>({
  data: {},
  setData: () => {},
});

export const BizProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<BizData>({});

  return (
    <BizContext.Provider value={{ data, setData }}>
      {children}
    </BizContext.Provider>
  );
};

export const useBiz = () => useContext(BizContext);
