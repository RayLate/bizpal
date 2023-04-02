import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

export interface ItemData {
  totalAmount: number;
  itemName: string;
  itemImg: string;
  itemUpdateTime: string;
  itemCreateTime: string;
  itemPrice: number;
  itemDescription: string;
  category: string;
  itamRate: number;
  itemBookedCount: number;
}

interface ItemDataContextValue {
  item: ItemData | null;
  setItem: React.Dispatch<React.SetStateAction<ItemData | null>>;
}

const ItemDataContext = createContext<ItemDataContextValue>({
  item: null,
  setItem: () => {},
});

export const useItemData = () => useContext(ItemDataContext)

export const ItemDataProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const [item, setItem] = useState<ItemData | null>(null);
    return (
        <ItemDataContext.Provider value={{item, setItem}}>
        {children}
        </ItemDataContext.Provider>
    );
};