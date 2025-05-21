'use client';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AddUserData,
  addUserSchema,
} from '@/components/add-user-form/addUserSchema';
import api from '@/lib/axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buttonStyle } from '@/app/login/LoginPage.styles';

interface AddUserFormProps {
  handleClose: () => void;
}
export default function AddUserForm({ handleClose }: AddUserFormProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: AddUserData) => api.post('/user', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      handleClose();
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserData>({
    resolver: zodResolver(addUserSchema),
  });
  const onSubmit = async (data: AddUserData) => {
    mutation.mutate(data);
  };
  return (
    <Box
      component="form"
      sx={{ mt: 2 }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <TextField
        margin="normal"
        required
        fullWidth
        label="First Name"
        {...register('firstName')}
        helperText={errors.firstName?.message || ''}
        error={!!errors.firstName}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Last Name"
        {...register('lastName')}
        helperText={errors.lastName?.message || ''}
        error={!!errors.lastName}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email"
        type="email"
        {...register('email')}
        helperText={errors.email?.message || ''}
        error={!!errors.email}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        {...register('password')}
        helperText={errors.password?.message || ''}
        error={!!errors.password}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          label="Role"
          {...register('role')}
          error={!!errors.role}
        >
          <MenuItem value="USER">User</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
        </Select>
      </FormControl>
      <Button
        disabled={mutation.isPending}
        type={'submit'}
        sx={buttonStyle}
        variant="contained"
        color="primary"
      >
        Create
      </Button>
    </Box>
  );
}
