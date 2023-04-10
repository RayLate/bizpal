import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import userTheme from '../theme/usertheme';
import sellerTheme from '../theme/sellertheme';

interface ThemeToggleContext {
  displayTheme: string;
  setDisplayTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeToggleContext = createContext<ThemeToggleContext>({
  displayTheme: 'user',
  setDisplayTheme: () => {},
});

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const ThemeToggleProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [displayTheme, setDisplayTheme] = useState<string>('seller');

  return (
    <ThemeToggleContext.Provider value={{ displayTheme, setDisplayTheme }}>
      <ThemeProvider theme={displayTheme === 'user' ? userTheme : sellerTheme}>
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};
