import { createBrowserRouter } from 'react-router-dom'

import { UserContextProvider } from './contexts/UserContext.jsx'

//Pages
import Login from './pages/Index/Login'
import Student from './pages/Student/Student'
import Students from './pages/Students/Students'
import Register from './pages/Register/Register'
import Photos from './pages/Photos/Photos'
import ErrorPage from './pages/error/ErrorPage'

//Private Routes
import PrivateRoute from './routes/PrivateRoute.jsx'

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
        element: <Students />,
      },
      {
        path: '/register',
        element: (
          <UserContextProvider>
            <Register />,
          </UserContextProvider>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      //Students routes
      {
        path: '/student',
        element: (
          <PrivateRoute>
            <Student />
          </PrivateRoute>
        ),
        children: [
          {
            path: ':id/edit',
            element: (
              <PrivateRoute>
                <Student />
              </PrivateRoute>
            ),
          },
        ],
      }, //Finish Students routes
      //Photos students route
      {
        path: '/photos/:id',
        element: (
          <PrivateRoute>
            <Photos />
          </PrivateRoute>
        ),
      }, // Finish photos students route
    ],
  },
])

export default router
