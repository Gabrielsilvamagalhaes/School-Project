import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useAuthMutate } from '../hooks/useAuthMutate'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import cookies from '../services/cookie'

import { draggable, pauseOnHover, theme } from '../config/toastifyOptions'
import axios from '../services/axios'

AuthContextProvider.propTypes = {
  children: PropTypes.node,
}

export const AuthContext = createContext({})

export function AuthContextProvider({ children }) {
  const { mutate, isSuccess, data, isPending } = useAuthMutate()
  const [user, setUser] = useState({})
  const [jwtToken, setJwTToken] = useState('')

  const createToken = ({ email, password }) => {
    mutate({ email, password })
  }

  const logoutUser = () => {
    cookies.remove('jwt_authorization')
    setJwTToken('')
    setUser({})
  }

  const modUser = async (updatedUser) => {
    const response = await axios.post('/tokens', {
      email: updatedUser?.email || user.email,
      password: updatedUser?.password,
    })

    if (response.status !== 200) return toast.error(response?.data?.message)
    const { token } = response.data

    setUser((state) => {
      const newState = {
        ...state,
        name: updatedUser.name || user.name,
        email: updatedUser.email || user.email,
      }
      return newState
    })

    const decoded = jwtDecode(token)
    cookies.set('jwt_authorization', token, {
      path: '/',
      sameSite: 'none',
      expires: new Date(decoded.exp * 1000),
      secure: true,
    })
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
      toast.success('logado com sucesso!', { theme, pauseOnHover, draggable })
    }
  }, [isSuccess, data])

  useEffect(() => {
    const token = cookies.get('jwt_authorization')
    if (token && typeof token === 'string') {
      setJwTToken(token)
      console.log('Token is set')
      const decoded = jwtDecode(token)
      const { id, name, email } = decoded
      setUser({ id, name, email })
    } else {
      console.log('Token is removed')
      setJwTToken('')
      setUser({})
    }
  }, [jwtToken])

  const tokenService = {
    createToken,
    isPending,
    user,
    modUser,
    cookies,
    jwtToken,
    logoutUser,
  }

  return (
    <AuthContext.Provider value={tokenService}>{children}</AuthContext.Provider>
  )
}
