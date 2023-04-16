import DashboardLayout from '@/components/DashboardComponents/DashboardLayout';
import ManageServicePage from '@/components/ManageServiceComponents/ManageServicePage';
import { ItemDataProvider } from '@/context/ItemContext';

const ManageService = () => {
  return (
    <>
      <DashboardLayout>
        <ItemDataProvider>
          <ManageServicePage />
        </ItemDataProvider>
      </DashboardLayout>
    </>
  );
};

export default ManageService;
