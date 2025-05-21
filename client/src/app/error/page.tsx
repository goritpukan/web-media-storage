import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export default function Page() {
  return (
    <Box
      sx={{
        backgroundColor: 'black',
        height: '100%',
        width: '100%',
        position: 'absolute',
        alignContent: 'center',
      }}
    >
      <Typography color={'white'} variant={'h3'} textAlign={'center'}>
        Something went wrong!
      </Typography>
      <Typography
        color={'white'}
        variant={'h4'}
        component={Link}
        href={'/'}
        textAlign={'center'}
        margin={'10px'}
        sx={{
          textDecoration: 'none',
          display: 'block',
          ':hover': { color: 'blue' },
        }}
      >
        Home
      </Typography>
    </Box>
  );
}
