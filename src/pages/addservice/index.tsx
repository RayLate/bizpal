import AddServicePage from '@/components/AddServiceComponents/AddServicePage';
import DashboardLayout from '@/components/DashboardComponents/DashboardLayout';
import { useThemeToggle } from '@/context/ThemeContext';
import { useEffect } from 'react';
const AddService = () => {
  const { changeDisplayTheme } = useThemeToggle();
  useEffect(() => changeDisplayTheme('seller'), []);
  return (
    <>
      <DashboardLayout>
        <AddServicePage />
      </DashboardLayout>
    </>
  );
};

export default AddService;
