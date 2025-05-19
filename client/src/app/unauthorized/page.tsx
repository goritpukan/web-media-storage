import { Box, Typography } from '@mui/material';

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
        You do not have permission to access this page!
      </Typography>
    </Box>
  );
}
