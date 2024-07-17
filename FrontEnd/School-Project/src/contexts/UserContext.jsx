import { createContext, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useUserMutate } from '../hooks/useUserMutate'
import { draggable, pauseOnHover, theme } from '../config/toastifyOptions'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading/Loading'

export const UserContext = createContext({})

UserContextProvider.propTypes = {
  children: PropTypes.node,
}

export function UserContextProvider({ children }) {
  const { mutate, isSuccess, isError, error, isPending } = useUserMutate()
  const navigate = useNavigate()

  const create = ({ name, email, password }) => {
    const data = { name, email, password }
    mutate(data)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Account created', { theme, pauseOnHover, draggable })
      navigate('/login')
    }
  }, [isSuccess, navigate])

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message, {
        theme,
        pauseOnHover,
        draggable,
      })
      toast.error('Invalid credentials', { theme, pauseOnHover, draggable })
    }
  }, [isError, error])

  const user = {
    create,
  }

  return (
    <UserContext.Provider value={user}>
      {isPending ? <Loading /> : children}
    </UserContext.Provider>
  )
}
