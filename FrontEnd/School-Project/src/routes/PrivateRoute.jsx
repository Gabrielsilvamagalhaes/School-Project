import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import cookies from '../services/cookie'

export default function PrivateRoute({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const redirectLastPage = () => {
    const path = localStorage.getItem('redirectPath')
    const redirectPath = path ? JSON.parse(path) : '/'
    console.log(redirectPath)
    navigate(redirectPath)
  }

  useEffect(() => {
    const token = cookies.get('jwt_authorization')
    localStorage.setItem('redirectPath', JSON.stringify(location.pathname))
    if (token && typeof token === 'string') {
      redirectLastPage()
      localStorage.removeItem('redirectPath')
      console.log('Possui autenticação')
      return
    }

    navigate('/login')
    console.log('Não Possui Autenticação')
  }, [])

  return children
}
