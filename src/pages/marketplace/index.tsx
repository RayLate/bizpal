import DashboardLayout from '@/components/DashboardComponents/DashboardLayout';
import NewBookingPage from '@/components/NewBookingComponents/NewBookingPage';
import { useThemeToggle } from '@/context/ThemeContext';
import { useEffect } from 'react';

const Marketplace = () => {
  const { changeDisplayTheme } = useThemeToggle();
  useEffect(() => changeDisplayTheme('user'), []);
  return (
    <>
      <DashboardLayout>
        <NewBookingPage />
      </DashboardLayout>
    </>
  );
};

export default Marketplace;
