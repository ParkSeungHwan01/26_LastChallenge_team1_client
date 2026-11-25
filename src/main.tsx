import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { Toaster } from '@/components/ui/sonner';
import { ApplyPostsProvider } from '@/lib/apply-posts-provider';
import { AuthProvider } from '@/lib/auth';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ApplyPostsProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ApplyPostsProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
