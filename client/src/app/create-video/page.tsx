'use client'
import { useContext, useEffect } from 'react';
import { AuthenticationContext } from '@/lib/providers/AuthenticationProvider';
import { useRouter } from 'next/navigation';
import CreateVideoForm from '@/components/create-video-form/CreateVideoForm';
import Grid from '@mui/material/Grid2';

export default function Page(){
  const router = useRouter();
  const { user, isLoading } = useContext(AuthenticationContext);
  useEffect(() => {
    if(user === null && !isLoading){
      router.push('/login');
    }
  }, []);
  if(user === null) return null;
  return(
    <Grid alignItems={'center'} justifyContent={'center'} sx={{width:'100vw', height:'100vh'}}>
      <CreateVideoForm/>
    </Grid>
  )
}