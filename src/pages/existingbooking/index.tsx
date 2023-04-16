import DashboardLayout from '@/components/DashboardComponents/DashboardLayout';
import ExistingBookingPage from '@/components/ExistingBookingComponents/ExistingBookingPage';
import { useThemeToggle } from '@/context/ThemeContext';
import { useEffect } from 'react';

const ExistingBooking = () => {
  const { changeDisplayTheme } = useThemeToggle();
  useEffect(() => changeDisplayTheme('user'), []);
  return (
    <>
      <DashboardLayout>
        <ExistingBookingPage />
      </DashboardLayout>
    </>
  );
};

export default ExistingBooking;
