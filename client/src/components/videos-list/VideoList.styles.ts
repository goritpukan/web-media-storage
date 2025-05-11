import { SxProps, Theme } from '@mui/material/styles';

export const GridStyles: SxProps<Theme> = {
  alignContent: 'center',
  width: '100%',
  position: 'relative',
  flexWrap: 'wrap',
  justifyContent: {
    xs: 'center',
    md: 'start',
  },
}