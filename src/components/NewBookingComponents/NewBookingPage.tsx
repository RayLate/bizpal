import { useState } from 'react';
import CategoryHeader from './CategoryHeader';
import { categories, generateItems, Item } from '../../static/dummyItems';
import Items from './Items';

export const randomItems = generateItems();

const NewBookingPage = () => {
  const [category, setCategory] = useState<string>(categories[0]);
  const [items, setItems] = useState<Item[]>(randomItems);

  return (
    <>
      <CategoryHeader
        category={category}
        setCategory={setCategory}
        categories={categories}
      />
      <Items items={items} selectedCategory={category} />
    </>
  );
};

export default NewBookingPage;
