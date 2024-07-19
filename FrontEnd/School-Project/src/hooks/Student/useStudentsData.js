import { useQuery } from '@tanstack/react-query'
import axios from '../../services/axios'
import cookies from '../../services/cookie'

const getStudents = async () => {
  const response = await axios.get('/students')
  const token = cookies.get('jwt_authorization')
  if (token) {
    axios.defaults.headers.authorization = `Bearer ${token}`
  }
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
