import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client'
import './index.scss'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { UserProvider } from './context/UserContext';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </QueryClientProvider>
)
