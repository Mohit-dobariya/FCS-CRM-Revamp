import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';

import logo from 'assets/images/fcs-logo.jpg';

// project-import
import { ThemeMode } from 'config';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

export default function LogoMain({ size = 120 }) {
  const theme = useTheme();
  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={theme.palette.mode === ThemeMode.DARK ? logoDark : logo} alt="Mantis" width="100" />
     *
     */
    <>
      <img src={logo} alt="FCS CRM" width={size} />
    </>
  );
}

LogoMain.propTypes = { reverse: PropTypes.bool };
