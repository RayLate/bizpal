import DashboardLayout from '@/components/DashboardComponents/DashboardLayout';
import PastBookingPage from '@/components/PastBookingComponent/PastBookingPage';
import { useThemeToggle } from '@/context/ThemeContext';
import { useEffect } from 'react';

const History = () => {
  const { changeDisplayTheme } = useThemeToggle();
  useEffect(() => changeDisplayTheme('user'), []);
  return (
    <>
      <DashboardLayout>
        <PastBookingPage />
      </DashboardLayout>
    </>
  );
};

export default History;
