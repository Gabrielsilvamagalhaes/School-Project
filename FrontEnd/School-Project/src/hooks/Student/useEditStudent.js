import { useContext } from 'react'
import { EditStudentContext } from '../../contexts/StudentEditContext'

export default function useEditStudent() {
  return useContext(EditStudentContext)
}
