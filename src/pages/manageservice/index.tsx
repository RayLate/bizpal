import DashboardLayout from '@/components/DashboardComponents/DashboardLayout';
import ManageServicePage from '@/components/ManageServiceComponents/ManageServicePage';
import { ItemDataProvider } from '@/context/ItemContext';
import { useThemeToggle } from '@/context/ThemeContext';
import { useEffect } from 'react';

const ManageService = () => {
  const { changeDisplayTheme } = useThemeToggle();
  useEffect(() => changeDisplayTheme('seller'), []);
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
