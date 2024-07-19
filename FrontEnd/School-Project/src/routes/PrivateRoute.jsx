import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import cookies from '../services/cookie'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'

export default function PrivateRoute({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const redirectLastPage = () => {
    const path = localStorage.getItem('redirectPath')
    const redirectPath = path ? JSON.parse(path) : '/'
    navigate(redirectPath)
  }

  useEffect(() => {
    const token = cookies.get('jwt_authorization')
    try {
      const { exp } = jwtDecode(token)
      if (exp > Date.now())
        toast.warning('Sua sessão expirou, faça login novamente')
    } catch (e) {
      console.log(e)
    } finally {
      localStorage.setItem('redirectPath', JSON.stringify(location.pathname))
    }
    if (token === undefined) {
      toast.info('Você precisa estar logado para acessar essa página')
      navigate('/login')
      console.log('Não Possui Autenticação')
      return
    }
    if (token && typeof token === 'string') {
      redirectLastPage()
      localStorage.removeItem('redirectPath')
      console.log('Possui autenticação')
      return
    }
  }, [])

  return children
}
