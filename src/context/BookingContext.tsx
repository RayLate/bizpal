import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

export interface BookingData {
  userId: string;
  itemId: string;
  bizId: string;
  amount: number;
}

interface BookingDataContextValue {
  booking: BookingData | null;
  setBooking: React.Dispatch<React.SetStateAction<BookingData | null>>;
}

const BookingDataContext = createContext<BookingDataContextValue>({
  booking: null,
  setBooking: () => {},
});

export const useBookingData = () => useContext(BookingDataContext)

export const BookingDataProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const [booking, setBooking] = useState<BookingData | null>(null);
    return (
        <BookingDataContext.Provider value={{booking, setBooking}}>
        {children}
        </BookingDataContext.Provider>
    );
};