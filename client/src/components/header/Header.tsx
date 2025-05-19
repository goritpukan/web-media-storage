'use client'
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { headerStyle, homeButtonStyle } from './Header.styles';
import { Box } from '@mui/system';
import { useContext } from 'react';
import { AuthenticationContext } from '@/lib/providers/AuthenticationProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Header() {
  const { user } = useContext(AuthenticationContext);
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
        {user !== undefined
          ? <AccountCircleIcon color={'action'} sx={{fontSize: '50px', cursor: 'pointer'}}/>
          : <Button variant={'contained'} component={Link} href={'/login'}>Login</Button>
        }
      </Toolbar>
    </AppBar>
  );
}
