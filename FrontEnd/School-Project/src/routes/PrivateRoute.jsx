import { useLocation, useNavigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  const isAuthenticated = false
  const navigate = useNavigate()
  const location = useLocation()

  if (isAuthenticated) return children

  localStorage.setItem('redirectPath', location.pathname)
  return navigate('/')
}
