import { useQuery } from '@tanstack/react-query'
import axios from '../services/axios'

const getStudents = async () => {
  const response = await axios.get('/students')
  return response?.data
}
export function useStudentsData() {
  const query = useQuery({
    queryKey: ['students'],
    queryFn: getStudents,
  })

  return {
    ...query,
    data: query?.data,
  }
}
