'use client';
import Grid from '@mui/material/Grid2';
import {
  Alert,
  AlertTitle,
  Button,
  TextField,
  Typography,
  Zoom,
} from '@mui/material';
import {
  loginGridStyle,
  buttonStyle,
  loginPageStyle,
} from '@/app/login/LoginPage.styles';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginData, loginSchema } from '@/app/login/loginSchema';
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { AuthenticationContext } from '@/lib/providers/AuthenticationProvider';
import { useContext, useEffect, useState } from 'react';
import { IUser } from '@/types/user';
import Loader from '@/components/loader/Loader';

export default function Page() {
  const { user, setUser, isLoading } = useContext(AuthenticationContext);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/');
    }
  }, [user, isLoading]);
  const mutation = useMutation({
    mutationFn: async (data: LoginData) => await api.post('/auth/login', data),
    onSuccess: async (res) => {
      setUser(res.data as IUser);
      router.push('/');
    },
    onError: async (error: AxiosError) => {
      setError(
        JSON.parse(error.request.response)?.message || 'Request failed.',
      );
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: LoginData) => {
    mutation.mutate(data);
  };

  if (isLoading && !user) {
    return <Loader />;
  }
  return (
    <Box sx={loginPageStyle}>
      <Box
        width={{ xs: '100%', sm: 'auto' }}
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid sx={loginGridStyle} container direction="column" spacing={2}>
          <Typography fontSize={'x-large'} textAlign={'center'}>
            Log in
          </Typography>
          <TextField
            {...register('email')}
            label="Email"
            type="email"
            helperText={errors.email?.message || ' '}
            error={!!errors.email}
          />
          <TextField
            {...register('password')}
            label="Password"
            type="password"
            helperText={errors.password?.message || ' '}
            error={!!errors.password}
          />
          <Button
            disabled={mutation.isPending}
            type={'submit'}
            sx={buttonStyle}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Box sx={{ display: mutation.isError ? 'block' : 'none' }}>
            <Zoom in={mutation.isError}>
              <Alert variant="filled" severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            </Zoom>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
