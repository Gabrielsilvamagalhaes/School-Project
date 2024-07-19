import { useMutation } from '@tanstack/react-query'
import axios from '../../services/axios'

const editStudent = async (data) => {
  const response = await axios.put(`/students/${data.id}`, data)
  return response
}

export function useStudentEditMutate() {
  const mutate = useMutation({
    mutationFn: editStudent,
    onError: (error) => {
      console.log(error.response?.status)
    },
  })

  return mutate
}
