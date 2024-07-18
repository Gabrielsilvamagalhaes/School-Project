import { createContext, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useUserEditMutate } from '../hooks/useUserEditMutate'
import { draggable, pauseOnHover, theme } from '../config/toastifyOptions'
import PropTypes from 'prop-types'
import Loading from '../components/Loading/Loading'

export const EditUserContext = createContext({})

EditUserContextProvider.propTypes = {
  children: PropTypes.node,
}

export function EditUserContextProvider({ children }) {
  const { mutateAsync, isSuccess, isError, error, isPending } =
    useUserEditMutate()

  const edit = async ({ name, email, password }) => {
    const data = { name, email, password }
    await mutateAsync(data)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Sucesso ao salvar dados!', {
        theme,
        pauseOnHover,
        draggable,
      })
    }
  }, [isSuccess])

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
    edit,
    isSuccess,
  }

  return (
    <EditUserContext.Provider value={user}>
      {isPending ? <Loading /> : children}
    </EditUserContext.Provider>
  )
}
