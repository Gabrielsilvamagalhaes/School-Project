import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useAuthMutate } from '../hooks/useAuthMutate'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import cookies from '../services/cookie'

import { draggable, pauseOnHover, theme } from '../config/toastifyOptions'
import Loading from '../components/Loading/Loading'

AuthContextProvider.propTypes = {
  children: PropTypes.node,
}

export const AuthContext = createContext({})

export function AuthContextProvider({ children }) {
  const { mutate, isSuccess, data, isPending } = useAuthMutate()
  const [user, setUser] = useState({})
  const [jwtToken, setJwTToken] = useState('')

  const createToken = async ({ email, password }) => {
    mutate({ email, password })
  }

  useEffect(() => {
    if (isSuccess && data) {
      const { token, user } = data
      console.log(data)
      const decoded = jwtDecode(token)

      cookies.set('jwt_authorization', token, {
        path: '/',
        sameSite: 'none',
        expires: new Date(decoded.exp * 1000),
        secure: true,
      })
      setUser(user)
      setJwTToken(cookies.get('jwt_authorization'))
      toast.success('logado com sucesso!', { theme, pauseOnHover, draggable })
    }
  }, [isSuccess, data])

  useEffect(() => {
    const token = cookies.get('jwt_authorization')
    if (token && typeof token === 'string') {
      setJwTToken(token)
    }
  }, [])

  const tokenService = {
    createToken,
    isPending,
    user,
    cookies,
    jwtToken,
  }

  return (
    <AuthContext.Provider value={tokenService}>{children}</AuthContext.Provider>
  )
}
