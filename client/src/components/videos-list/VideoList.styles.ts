import { SxProps, Theme } from '@mui/material/styles';

export const GridStyles: SxProps<Theme> = {
  position: 'relative',
  margin: 'auto',
  alignContent: 'center',
  width: '90%',
  flexWrap: 'wrap',
  justifyContent: {
    xs: 'center',
    md: 'flex-start',
  },
};
