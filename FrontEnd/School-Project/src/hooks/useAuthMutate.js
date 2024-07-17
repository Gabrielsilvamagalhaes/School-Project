import { useMutation } from '@tanstack/react-query'
import axios from '../services/axios'
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'

const getToken = async ({ email, password }) => {
  const response = await axios
    .post('/tokens', { email, password })
    .catch((error) => {
      const cookies = new Cookies(null, { path: '/' })
      cookies.remove('jwt_authorization')
      console.clear()
      toast.error(error?.response?.data)
    })

  axios.defaults.headers.Authorization = `Bearer ${response?.data?.token}`
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
