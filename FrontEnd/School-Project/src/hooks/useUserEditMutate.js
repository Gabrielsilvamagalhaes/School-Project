import { useMutation } from '@tanstack/react-query'
import axios from '../services/axios'

const editUser = async (data) => {
  const response = await axios.put('/user/update', data)
  return response
}

export function useUserEditMutate() {
  const mutate = useMutation({
    mutationFn: editUser,
    onError: (error) => {
      console.log(error.response?.status)
    },
  })

  return mutate
}
