import { useRouter } from 'next/router';

import DashboardLayout from '@/components/DashboardComponents/DashboardLayout';
import { useEffect, useState } from 'react';
import ItemDetail from '@/components/NewBookingComponents/ItemDetail';
import { sendAPICall } from '@/context/api';
import { Item } from '@/interface/interface';

const ItemDetailPage = () => {
  const router = useRouter();
  const { itemid } = router.query;
  const [item, setItem] = useState<Item>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!itemid) return;
    const getItem = async () => {
      const url = `https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/items/${itemid}`;
      const httpMethod = 'GET';
      const response = await sendAPICall({ url, httpMethod });

      if (response) {
        const item: Item = {
          itemId: response[0].itemId,
          category: response[0].attr.category,
          itemName: response[0].attr.itemName,
          itemDescription: response[0].attr.itemDescription,
          itemImg: response[0].attr.itemImg,
          itemPrice: response[0].attr.itemPrice,
          itemRate: response[0].attr.itemRate,
          itemBookedCount: response[0].attr.itemBookedCount,
          itemCreateTime: new Date(response[0].attr.itemCreateTime),
          itemUpdateTime: new Date(response[0].attr.itemUpdateTime),
          totalAmount: response[0].attr.totalAmount,
          bizId: response[0].bizId,
          serviceInterval: response[0].attr.serviceInterval,
          openingHourStart: response[0].attr.openingHourStart,
          openingHourEnd: response[0].attr.openingHourEnd,
          openingDay: response[0].attr.openingDay,
          isActive: response[0].attr.isActive,
          bizName: response[0].attr.bizName,
        };
        setItem(item);
        console.log(response);
      }
    };
    getItem();
  }, [itemid]);

  return (
    <>
      <DashboardLayout>
        <ItemDetail item={item} />
      </DashboardLayout>
    </>
  );
};

export default ItemDetailPage;
