import { useMutation } from '@tanstack/react-query'
import axios from '../services/axios'

const removeStudent = async (id) => {
  const response = await axios.delete(`/students/${id}`)

  return response?.data
}
export function useRemoveStudent() {
  const mutate = useMutation({
    mutationFn: removeStudent,
  })

  return {
    ...mutate,
    data: mutate?.data,
  }
}
