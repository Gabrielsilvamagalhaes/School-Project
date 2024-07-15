import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  const isAuthenticated = false
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('redirectPath', JSON.stringify(location.pathname))
      navigate('/login')
      console.log('Passando pela rota privada')
    }
  }, [])

  return children
}
