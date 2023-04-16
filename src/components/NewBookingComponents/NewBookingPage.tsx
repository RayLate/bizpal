import { useState, useEffect } from 'react';
import CategoryHeader from './CategoryHeader';
import Items from './Items';
import { sendAPICall } from '@/context/api';
import { Item } from '@/interface/interface';

const NewBookingPage = () => {
  const [categories, setCategories] = useState<string[]>(['All']);
  const [category, setCategory] = useState<string>('All');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const getItems = async () => {
      const url =
        'https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/items';
      const httpMethod = 'GET';
      const response = await sendAPICall({ url, httpMethod });

      if (response && response.length > 0 && isMounted) {
        const items: Item[] = response.map((itemObj: any) => ({
          itemId: itemObj.itemId,
          category: itemObj.attr.category,
          itemName: itemObj.attr.itemName,
          itemDescription: itemObj.attr.itemDescription,
          itemImg: itemObj.attr.itemImg,
          itemPrice: itemObj.attr.itemPrice,
          itemRate: itemObj.attr.itemRate,
          itemBookedCount: itemObj.attr.itemBookedCount,
          itemCreateTime: new Date(itemObj.attr.itemCreateTime),
          itemUpdateTime: new Date(itemObj.attr.itemUpdateTime),
          totalAmount: itemObj.attr.totalAmount,
          bizId: itemObj.bizId,
          serviceInterval: itemObj.attr.serviceInterval,
          openingHourStart: itemObj.attr.openingHourStart,
          openingHourEnd: itemObj.attr.openingHourEnd,
          openingDay: itemObj.attr.openingDay,
          isActive: itemObj.attr.isActive,
          bizName: itemObj.attr.bizName,
        }));
        const categories = new Set(
          items.map((item) => item.category.toLowerCase())
        );
        setCategories(['All', ...Array.from(categories)]);
        setItems(items.filter((i) => i.isActive));
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    getItems();

    return () => {
      isMounted = false;
      setLoading(false);
    };
  }, []);

  return (
    <>
      <CategoryHeader
        category={category}
        setCategory={setCategory}
        categories={categories}
        loading={loading}
      />
      <Items items={items} selectedCategory={category} loading={loading} />
    </>
  );
};

export default NewBookingPage;
