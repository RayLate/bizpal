export const categories: string[] = [
  'Food',
  'Beauty',
  'Services',
  'Fitness',
  'Fashion',
  'Technology',
  'Travel',
  'Home',
];

export interface Item {
  id: string;
  cate: string;
  itemName: string;
  bizId: string;
  itemRate: number;
  itemDescription: string;
  publishDate: Date;
  itemPrice: number;
  amount: number;
  itemImg: string;
  itemBookedCount: number;
}

function generateDummyItems(cate: string): Item {
  const id = (Math.floor(Math.random() * 1000000) + 1).toString();
  const itemName = `Dummy ${cate} Item`;
  const bizId = `Dummy ${cate} Provider`;
  const itemRate = Math.floor(Math.random() * 5) + 1;
  const itemDescription = `This is a dummy ${cate} item provided by ${bizId}.`;
  const publishDate = new Date();
  const itemPrice = Math.floor(Math.random() * 100) + 1;
  const amount = 1;
  const itemImg = '';
  const itemBookedCount = Math.floor(Math.random() * 100) + 1;
  return {
    id,
    cate,
    itemName,
    bizId,
    itemRate,
    itemDescription,
    publishDate,
    itemPrice,
    amount,
    itemImg,
    itemBookedCount,
  };
}

export const generateItems = () => {
  const dummyItems: Item[] = [];

  for (let i = 0; i < 100; i++) {
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const dummyItem = generateDummyItems(randomCategory);
    dummyItems.push(dummyItem);
  }

  return dummyItems;
};
