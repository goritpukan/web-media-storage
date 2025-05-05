import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface FileUploadProps {
  text: string;
  sx?: SxProps<Theme>;
  startIcon: React.ReactNode;
  accept?: string;
  register?: UseFormRegisterReturn;
}
