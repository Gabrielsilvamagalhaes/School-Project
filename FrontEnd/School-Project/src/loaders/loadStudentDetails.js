import axios from '../services/axios'

export default async function loadStudentDetails({ params }) {
  const { id } = params
  if (!id) return null
  const findStudentById = async (id) => {
    const response = await axios.get(`/students/${id}`).catch((error) => {
      console.error(error?.response?.data?.message)
    })
    return response?.data
  }

  const student = await findStudentById(+id)
  if (!student) throw new Error('Student not found')

  return student
}
