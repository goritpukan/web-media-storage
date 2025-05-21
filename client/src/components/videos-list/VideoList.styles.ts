import { SxProps, Theme } from '@mui/material/styles';

export const GridStyles: SxProps<Theme> = {
  position: 'relative',
  margin: 'auto',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    sm: '1fr 1fr',
    md: '1fr 1fr 1fr',
  },
  justifyItems: 'center',
};
