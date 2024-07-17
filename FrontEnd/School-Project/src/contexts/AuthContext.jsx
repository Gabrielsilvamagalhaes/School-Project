import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useAuthMutate } from '../hooks/useAuthMutate'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import cookies from '../services/cookie'

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
      const decoded = jwtDecode(token)

      cookies.set('jwt_authorization', token, {
        path: '/',
        sameSite: 'none',
        expires: new Date(decoded.exp * 1000),
        secure: true,
      })
      setUser(user)
      setJwTToken(cookies.get('jwt_authorization'))
      toast.success('Login successful!')
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
    isSuccess,
    user,
    cookies,
    jwtToken,
  }

  return (
    <AuthContext.Provider value={tokenService}>
      {isPending && <p>Carregando...</p>}
      {children}
    </AuthContext.Provider>
  )
}
