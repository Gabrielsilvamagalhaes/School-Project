import GlobalStyles from './styles/GlobalStyles.jsx'

import { ToastContainer } from 'react-toastify'

import router from './Router.jsx'
import { RouterProvider } from 'react-router-dom'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './services/queryClient.js'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={router} />
          <GlobalStyles />
          <ToastContainer autoClose={3000} className="toast-container" />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}
