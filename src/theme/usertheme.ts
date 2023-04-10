import { createTheme } from '@mui/material/styles';
import { cyan, orange } from '@mui/material/colors';

const userTheme = createTheme({
  palette: {
    primary: cyan,
    secondary: orange,
  },
});

export default userTheme;
