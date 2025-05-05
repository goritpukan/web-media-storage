import { SxProps, Theme } from '@mui/material/styles';

export const headerStyle: SxProps<Theme> = {
  backgroundColor: 'white',
  borderBottom: '1px solid gray',
  width: '100%',
  padding: 0,
  zIndex: 999,
};
export const homeButtonStyle: SxProps<Theme> = {
  ':hover': {
    backgroundColor: 'white',
  },
  ':hover .text': {
    transition: '.3s',
    color: 'blue',
  },
};
