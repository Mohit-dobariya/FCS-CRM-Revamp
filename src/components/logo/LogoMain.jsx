import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';

import logo from 'assets/images/fcs-logo.jpg';

// ==============================|| LOGO SVG ||============================== //

export default function LogoMain({ reverse }) {
  const theme = useTheme();
  return (
    <>
      <img width="120" alt="logo" src={logo} />
    </>
  );
}

LogoMain.propTypes = { reverse: PropTypes.bool };
