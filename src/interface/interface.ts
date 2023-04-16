export interface Item {
  itemId: string;
  category: string;
  itemName: string;
  bizId: string;
  itemRate: number;
  itemDescription: string;
  itemPrice: number;
  totalAmount: number;
  itemImg: string;
  itemBookedCount: number;
  itemUpdateTime: Date;
  itemCreateTime: Date;
  serviceInterval: number;
  openingHourStart: number;
  openingHourEnd: number;
  openingDay: number[];
  isActive: boolean;
  bizName: string;
}

export interface NewBooking {
  userId: string;
  itemId: string;
  bizId: string;
  amount: number;
  bookingDate: string;
}

export interface CustomerData {
  email: string;
  user: string;
  region: string;
  isSeller: number;
  bookingCount: number;
  interest: string;
}

export interface Booking {
  bookingId: string;
  bizId: string;
  bookingStatus: string;
  bookingDate: Date;
  bookingCreateTime: Date;
  bookingUpdateTime: Date;
  bookingAmount: number;
  itemId: string;
  totalAmount: number;
  itemName: string;
  itemImg: string;
  itemPrice: number;
  itemDescription: string;
  itemRate: number;
  itemBookedCount: number;
}

export interface GroupbyBooking {
  bookingDate: string;
  booking: Booking;
}
