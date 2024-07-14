import { createBrowserRouter } from 'react-router-dom'

//Pages
import Login from './pages/Index/Login'
import ErrorPage from './pages/error/ErrorPage'

//Private Routes
import PrivateRoute from './routes/PrivateRoute'

//Layout Routes
import Root from './routes/Root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
])

export default router
