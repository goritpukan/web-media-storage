import { SxProps, Theme } from '@mui/material/styles';

export const loginPageStyle: SxProps = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'lightblue',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const loginGridStyle: SxProps<Theme> = {
  backgroundColor: 'white',
  position: 'relative',
  border: '1px solid gray',
  borderRadius: '5px',
  padding: '30px',
  width: {
    xs: '100%',
    sm: '400px',
    md: '500px',
  },

  height: 'auto',
};

export const buttonStyle: SxProps<Theme> = {
  position: 'relative',
};
