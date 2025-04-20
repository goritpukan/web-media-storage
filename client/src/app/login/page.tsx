'use client'
import Grid from "@mui/material/Grid2";
import {Alert, AlertTitle, Button, TextField, Typography, Zoom} from "@mui/material";
import {loginGridStyle, buttonStyle, loginPageStyle} from "@/app/login/LoginPage.styles";
import {Box} from "@mui/system";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginData, loginSchema} from "@/app/login/loginSchema";
import {useMutation} from "@tanstack/react-query";
import api from "@/lib/axios";
import {AxiosError} from "axios";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: (data: LoginData) => api.post('/auth/login', data),
        onSuccess: () => router.push('/'),
    })
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
    });
    const onSubmit = async (data: LoginData) => {
        mutation.mutate(data);
    }

    return (
        <Box sx={loginPageStyle}>
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
                <Grid sx={loginGridStyle} container direction="column" spacing={2}>
                    <Typography fontSize={'x-large'} textAlign={'center'}>Log in</Typography>
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
                        color="primary">Login</Button>
                    <Box sx={{display: mutation.isError ? 'block' : 'none'}}>
                        <Zoom in={mutation.isError}>
                            <Alert variant="filled" severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {mutation.error instanceof AxiosError && mutation.error?.response?.data?.message}
                            </Alert>
                        </Zoom>
                    </Box>
                </Grid>
            </Box>
        </Box>
    )
}