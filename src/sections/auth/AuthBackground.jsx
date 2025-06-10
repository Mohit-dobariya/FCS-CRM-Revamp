// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// project-import
import { ThemeDirection, ThemeMode } from 'config';

import logo from 'assets/images/fcs-logo.jpg';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

export default function AuthBackground() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        filter: 'blur(5px)',
        zIndex: -1,
        bottom: 0,
        transform: theme.direction === ThemeDirection.RTL ? 'rotate(180deg)' : 'inherit'
      }}
    >
      <img src={logo} width="100%" height="calc(100vh - 175px)" alt="FCS CRM" />
    </Box>
  );
}
