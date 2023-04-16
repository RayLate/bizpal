import DashboardLayout from '@/components/DashboardComponents/DashboardLayout';
import BusinessRegistrationPage from '@/components/RegistrationComponents/BusinessRegistrationPage';
import { useThemeToggle } from '@/context/ThemeContext';
import { useEffect } from 'react';

const Business = () => {
    const { changeDisplayTheme } = useThemeToggle();
    useEffect(() => changeDisplayTheme('seller'), []);
  return (
    <>
      <DashboardLayout>
        <BusinessRegistrationPage />
      </DashboardLayout>
    </>
  );
};

export default Business;
