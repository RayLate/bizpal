import { ServiceItemRaw } from '@/components/ManageServiceComponents/ManageServicePage';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

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
  serviceItem: ServiceItemRaw | null;
  setServiceItem: React.Dispatch<React.SetStateAction<ServiceItemRaw | null>>;
  setItem: React.Dispatch<React.SetStateAction<ItemData | null>>;
}

const ItemDataContext = createContext<ItemDataContextValue>({
  item: null,
  serviceItem: null,
  setServiceItem: () => {},
  setItem: () => {},
});

export const useItemData = () => useContext(ItemDataContext);

export const ItemDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [item, setItem] = useState<ItemData | null>(null);
  const [serviceItem, setServiceItem] = useState<ServiceItemRaw | null>(null);
  
  return (
    <ItemDataContext.Provider
      value={{ item, setItem, serviceItem, setServiceItem }}
    >
      {children}
    </ItemDataContext.Provider>
  );
};
