import { SxProps, Theme } from '@mui/material/styles';

export const gridStyles: SxProps<Theme> = {
  flexWrap: 'wrap',
  flexDirection: 'column',
  alignItems: 'center',
  textDecoration: 'none',
  width: {
    xs: '90vw',
    sm: '300px',
    md: '300px',
  },
  position: 'relative',
  border: '1px solid gray',
  borderRadius: '5px',
  padding: '20px',
  backgroundColor: '#f5f5f5',
};

export const durationStyles: SxProps<Theme> = {
  position: 'absolute',
  textAlign: 'end',
  zIndex: 4,
  bottom: 5,
  right: 5,
  color: 'white',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  padding: '5px',
  borderRadius: '5px',
};
