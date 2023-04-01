import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import DashboardLayout from '@/components/DashboardComponents/DashboardLayout';
import { useEffect, useState } from 'react';
import { generateItems, Item } from '@/components/NewBookingComponents/data';
import { randomItems } from '@/components/NewBookingComponents/NewBookingPage';

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
        <Typography variant='h5' color='initial'>
          ItemId: {itemid}
        </Typography>
        <Typography variant='h5' color='initial'>
          ItemName: {item?.serviceName}
        </Typography>
      </DashboardLayout>
    </>
  );
};

export default ItemDetailPage;
