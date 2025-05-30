'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import AuthenticationProvider from '@/lib/providers/AuthenticationProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </AuthenticationProvider>
    </QueryClientProvider>
  );
}
