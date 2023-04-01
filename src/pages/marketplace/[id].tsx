import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import DashboardLayout from '@/components/DashboardComponents/DashboardLayout';

const ItemDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <DashboardLayout>
        <Typography variant='h1' color='initial'>
          Item: {id}
        </Typography>
      </DashboardLayout>
    </>
  );
};

export default ItemDetailPage;
