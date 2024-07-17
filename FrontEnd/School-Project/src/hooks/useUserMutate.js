import { useMutation } from '@tanstack/react-query'
import axios from '../services/axios'

const createUser = async (data) => {
  return await axios.post('/user/register', data)
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
