'use client';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import Link from 'next/link';
import { headerStyle, homeButtonStyle } from './Header.styles';
import { Box } from '@mui/system';
import { useContext, useState, MouseEvent } from 'react';
import { AuthenticationContext } from '@/lib/providers/AuthenticationProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import api from '@/lib/axios';

export default function Header() {
  const { user, isLoading, logout } = useContext(AuthenticationContext);
  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);

  const handleClick = (event: MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const res = await api.post('auth/logout');
      if (res.status === 201) {
        logout();
        handleClose();
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <AppBar sx={headerStyle} position="sticky">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button sx={homeButtonStyle} component={Link} href={'/'}>
            <Typography variant={'h6'} className={'text'} color={'black'}>
              Video Storage
            </Typography>
          </Button>
        </Box>
        {!isLoading &&
          (user !== null ? (
            <AccountCircleIcon
              color={'action'}
              sx={{ fontSize: '50px', cursor: 'pointer' }}
              onClick={handleClick}
            />
          ) : (
            <Button variant={'contained'} component={Link} href={'/login'}>
              Login
            </Button>
          ))}
        <Menu onClose={handleClose} anchorEl={anchorEl} open={!!anchorEl}>
          <MenuItem
            component={Link}
            href={'/create-video'}
            onClick={handleClose}
          >
            <Typography>Add Video</Typography>
          </MenuItem>
          {user?.role === 'ADMIN' && (
            <MenuItem component={Link} href={'/users'} onClick={handleClose}>
              <Typography>Manage Users</Typography>
            </MenuItem>
          )}
          <MenuItem onClick={handleLogout}>
            <Typography color={'error'}>Log Out</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
