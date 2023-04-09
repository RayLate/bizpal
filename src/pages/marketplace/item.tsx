import { useRouter } from 'next/router';

import DashboardLayout from '@/components/DashboardComponents/DashboardLayout';
import { useEffect, useState } from 'react';
import { generateItems, Item } from '@/static/dummyItems';
import { randomItems } from '@/components/NewBookingComponents/NewBookingPage';
import ItemDetail from '@/components/NewBookingComponents/ItemDetail';

const ItemDetailPage = () => {
  const router = useRouter();
  const { itemid } = router.query;
  const [item, setItem] = useState<Item>();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!itemid) return;
    setItem(randomItems.find((i) => i.id === itemid));
    setLoading(false);
  }, [itemid, router]);

  return (
    <>
      <DashboardLayout>
        <ItemDetail item={item} />
      </DashboardLayout>
    </>
  );
};

export default ItemDetailPage;
