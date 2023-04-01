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

function generateDummyItems(category: string): Item {
  const id = (Math.floor(Math.random() * 1000000) + 1).toString();
  const itemName = `Dummy ${category} Item`;
  const bizId = `Dummy ${category} Provider`;
  const itemRate = Math.floor(Math.random() * 5) + 1;
  const itemDescription = `This is a dummy ${category} item provided by ${bizId}.`;
  const publishDate = new Date();
  const itemPrice = Math.floor(Math.random() * 100) + 1;
  const amount = 1;
  const itemImg = `https://source.unsplash.com/random/?${category.toLowerCase()}`;
  const itemBookedCount = Math.floor(Math.random() * 100) + 1;
  return {
    id,
    category,
    itemName,
    bizId,
    itemRate,
    itemDescription,
    publishDate,
    itemPrice,
    amount,
    itemImg,
    itemBookedCount,
    itemUpdateTime: new Date('2023/3/13'),
    itemCreatedTime: new Date('2023/3/12'),
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
