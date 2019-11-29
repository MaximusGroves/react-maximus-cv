import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();
const buildTheme = selectedTheme =>
  createMuiTheme({
    images: selectedTheme.images,
    palette: selectedTheme.palette,
    overrides: selectedTheme.overrides,

    typography: {
      // useNextVariants: true,
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      width: '100%'

      // transition:'background-color 0.3s',
    },

    firstCard: {
      marginTop: 0
    },

    fonts: {
      // primary: 'Product Sans',
      primary: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      secondary: "'Roboto', 'Helvetica', 'Arial', sans-serif"
    }
  });

export default buildTheme;
