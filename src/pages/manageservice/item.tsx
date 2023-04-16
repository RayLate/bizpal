import DashboardLayout from '@/components/DashboardComponents/DashboardLayout';
import { ServiceItemRaw } from '@/components/ManageServiceComponents/ManageServicePage';
import ServiceItemDetail from '@/components/ManageServiceComponents/ServiceItemDetail';
import { sendAPICall } from '@/context/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditServicePage() {
  const router = useRouter();
  const { itemid } = router.query;
  const [serviceItem, setServiceItem] = useState<ServiceItemRaw>();

  useEffect(() => {
    let isMounted = true;
    if (!itemid) return;
    const getItem = async () => {
      const url = `https://7beqwqk0rk.execute-api.us-east-1.amazonaws.com/prod/items/${itemid}`;
      const httpMethod = 'GET';
      const response = await sendAPICall({ url, httpMethod });

      if (response) {
        setServiceItem(response[0]);
      }
    };
    getItem();

    return () => {
      isMounted = false;
    };
  }, [itemid]);

  return (
    <>
      <DashboardLayout>
        {serviceItem ? <ServiceItemDetail serviceItem={serviceItem} /> : null}
      </DashboardLayout>
    </>
  );
}
