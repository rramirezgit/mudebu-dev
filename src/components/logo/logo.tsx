import { forwardRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';
// routes
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
  white?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, white, sx, ...other }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    let _color = theme.palette.mode === 'light' ? PRIMARY_LIGHT : 'white';

    if (white) {
      _color = 'white';
    }

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <svg
          width="218"
          height="60"
          viewBox="0 0 218 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M111.99 35.7814C111.99 29.7934 108.101 25.567 102.879 25.567C97.6577 25.567 93.7144 29.8534 93.7144 35.7814C93.7144 41.7094 97.4363 45.7618 102.879 45.7618C108.323 45.7618 111.99 41.7106 111.99 35.7814ZM118.155 7.89697V51.0466H111.823V47.1718C109.431 50.1922 105.875 52.1134 101.025 51.9118C93.7053 51.6082 87.8329 45.361 87.1846 37.6498C86.3342 27.5434 92.4132 19.4626 101.715 19.4626C106.159 19.4626 109.491 21.3406 111.769 24.2182V7.89697H118.157H118.155Z"
            fill={_color}
          />
          <path
            d="M168.965 45.763C174.409 45.763 178.13 41.5954 178.13 35.7826C178.13 29.9698 174.409 25.5682 168.965 25.5682C163.522 25.5682 159.855 29.7946 159.855 35.7826C159.855 41.7706 163.744 45.763 168.965 45.763ZM160.077 7.89697V24.2182C162.354 21.3406 165.687 19.4626 170.131 19.4626C179.433 19.4626 185.512 27.5434 184.661 37.6498C184.012 45.361 178.14 51.6094 170.819 51.9118C165.97 52.1134 162.414 50.1922 160.022 47.1718V51.0466H153.689V7.89697H160.077Z"
            fill={_color}
          />
          <path
            d="M128.536 33.1404H143.2C143.2 28.4436 140.59 25.3332 136.146 25.3332C132.368 25.3332 129.314 27.858 128.536 33.1404ZM149.922 38.0712H128.48C129.147 43.8828 132.425 46.4076 136.812 46.4076C140.867 46.4076 143.478 44.706 145.033 40.9488L149.643 45.2928C146.922 49.932 141.978 52.1028 136.645 52.1028C127.536 52.1028 121.759 45.4692 121.759 36.018C121.759 26.5668 127.868 19.6392 136.256 19.6392C144.643 19.6392 150.087 26.0388 150.087 35.3724C150.087 36.252 150.032 37.0152 149.921 38.0724"
            fill={_color}
          />
          <path
            d="M40.6147 19.6392H32.283V28.6068L31.7789 28.6128L28.9255 19.6392H13.2375V28.6068L12.7334 28.6128L9.88007 19.6392H2.27051L6.01625 31.0284V51.0468H13.2772V32.4192C13.2772 28.968 15.9239 26.1708 19.1894 26.1708C22.4548 26.1708 25.1015 28.968 25.1015 32.4192V51.0468H32.2909V32.4192C32.2909 28.968 34.9376 26.1708 38.203 26.1708C41.4685 26.1708 44.1152 28.968 44.1152 32.4192V51.0468H51.3364V31.674C51.3364 24.1596 47.2251 19.6392 40.6158 19.6392"
            fill={_color}
          />
          <path
            d="M82.0717 39.6576V19.6392H74.8459V38.2668C74.8459 41.718 72.1993 44.5152 68.9338 44.5152C65.6683 44.5152 63.0217 41.718 63.0217 38.2668V19.6392H55.7959V39.012C55.7959 46.5264 59.9072 51.0468 66.5165 51.0468C71.0162 51.0468 72.3605 50.9652 74.8482 50.9652V42.0792L75.3523 42.0732L78.2056 51.0468H85.8152L82.0694 39.6576H82.0717Z"
            fill={_color}
          />
          <path
            d="M189.456 39.6576V19.6392H196.682V38.2668C196.682 41.718 199.329 44.5152 202.594 44.5152C205.86 44.5152 208.506 41.718 208.506 38.2668V19.6392H215.732V39.012C215.732 46.5264 211.621 51.0468 205.012 51.0468C200.512 51.0468 199.168 50.9652 196.68 50.9652V42.0792L196.176 42.0732L193.322 51.0468H185.713L189.459 39.6576H189.456Z"
            fill={_color}
          />
        </svg>
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
