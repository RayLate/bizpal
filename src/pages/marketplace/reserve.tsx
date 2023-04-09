import { useRouter } from 'next/router';

import DashboardLayout from '@/components/DashboardComponents/DashboardLayout';
import { useEffect, useState } from 'react';

const ItemReservePage = () => {
  const router = useRouter();
  const { itemid } = router.query;
  const [loading, setLoading] = useState(true);


  return (
    <>
      <DashboardLayout>
        reserve page 
      </DashboardLayout>
    </>
  );
};

export default ItemReservePage;
