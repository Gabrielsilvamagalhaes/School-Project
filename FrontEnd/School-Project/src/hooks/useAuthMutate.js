import { useMutation } from '@tanstack/react-query'
import axios from '../services/axios'
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'
import { draggable, pauseOnHover, theme } from '../config/toastifyOptions'

const getToken = async ({ email, password }) => {
  const response = await axios
    .post('/tokens', { email, password })
    .catch((error) => {
      const cookies = new Cookies(null, { path: '/' })
      cookies.remove('jwt_authorization')
      console.clear()
      toast.error(error?.response?.data, { theme, pauseOnHover, draggable })
    })

  axios.defaults.headers.authorization = `Bearer ${response?.data?.token}`
  return response?.data
}

export function useAuthMutate() {
  const mutate = useMutation({
    mutationFn: getToken,
  })

  return {
    ...mutate,
    data: mutate?.data,
  }
}
