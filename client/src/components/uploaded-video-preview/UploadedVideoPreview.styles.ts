import { SxProps, Theme } from '@mui/material/styles';

export const previewStyles: SxProps<Theme> = {
  justifyContent: 'flex-start',
  alignItems: 'center',
}

export const imageStyles: SxProps<Theme> = {
  width: '400px',
  height: '200px',
  border: '1px solid black',
  display: 'flex',
  objectFit: 'cover',
}