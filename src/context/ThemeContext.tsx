import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useEffect,
} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import userTheme from '../theme/usertheme';
import sellerTheme from '../theme/sellertheme';

interface ThemeToggleContext {
  displayTheme: string;
  changeDisplayTheme: (theme: string) => void;
}

const ThemeToggleContext = createContext<ThemeToggleContext>({
  displayTheme: 'user',
  changeDisplayTheme: () => {},
});

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const ThemeToggleProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [displayTheme, setDisplayTheme] = useState<string>('user');
  useEffect(() => {
    if (localStorage.getItem('displayTheme')) {
      const initTheme = localStorage.getItem('displayTheme');
      setDisplayTheme(initTheme as string);
    } else {
      localStorage.setItem('displayTheme', displayTheme);
    }
  }, []);

  function changeDisplayTheme(theme: string) {
    setDisplayTheme(theme);
    localStorage.setItem('displayTheme', theme);
  }

  return (
    <ThemeToggleContext.Provider value={{ displayTheme, changeDisplayTheme }}>
      <ThemeProvider theme={displayTheme === 'user' ? userTheme : sellerTheme}>
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
