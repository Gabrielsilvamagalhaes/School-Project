import GlobalStyles from './styles/GlobalStyles.jsx'

import { ToastContainer } from 'react-toastify'

import router from './Router.jsx'
import { RouterProvider } from 'react-router-dom'

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalStyles />
      <ToastContainer autoClose={3000} className="toast-container" />
    </>
  )
}
