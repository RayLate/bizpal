import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

export interface BizData {
  userId: string;
  itemId: string;
  bizId: string;
  amount: number;
}

interface BizDataContextValue {
  biz: BizData | null;
  setBiz: React.Dispatch<React.SetStateAction<BizData | null>>;
}

const BizDataContext = createContext<BizDataContextValue>({
  biz: null,
  setBiz: () => {},
});

export const useBizData = () => useContext(BizDataContext)

export const BizDataProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const [biz, setBiz] = useState<BizData | null>(null);
    return (
        <BizDataContext.Provider value={{biz, setBiz}}>
        {children}
        </BizDataContext.Provider>
    );
};