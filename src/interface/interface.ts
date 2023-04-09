export interface Item {
  itemId: string;
  category: string;
  itemName: string;
  bizId: string;
  itemRate: number;
  itemDescription: string;
  publishDate: Date;
  itemPrice: number;
  amount: number;
  itemImg: string;
  itemBookedCount: number;
  itemUpdateTime: Date;
  itemCreatedTime: Date;
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
  attr: {
    bookingStatus: string;
    bookingDate: string;
    bookingCreateTime: string;
    bookingUpdateTime: string;
    bookingAmount: number;
  };
  sk: string;
  itemId: string;
  pk: string;
}
