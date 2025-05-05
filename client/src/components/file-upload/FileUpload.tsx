import { FileUploadProps } from '@/components/file-upload/types';
import { Button } from '@mui/material';

export default function FileUpload({
  text,
  sx,
  startIcon,
  accept,
  register,
}: FileUploadProps) {
  return (
    <Button
      sx={sx}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={2}
      startIcon={startIcon}
      fullWidth={true}
    >
      {text}
      <input type="file" multiple hidden={true} {...register} accept={accept} />
    </Button>
  );
}
