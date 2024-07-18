import { useMutation } from '@tanstack/react-query'
import axios from '../services/axios'
import cookies from '../services/cookie'

const createUser = async (data) => {
  const response = await axios.post('/user/register', data)
  const token = cookies.get('jwt_authorization')
  if (token) {
    axios.defaults.headers.authorization = `Bearer ${token}`
  }
  return response?.data
}

export function useUserMutate() {
  const mutate = useMutation({
    mutationFn: createUser,
    onError: (error) => {
      console.log(error.response?.status)
    },
  })

  return mutate
}
