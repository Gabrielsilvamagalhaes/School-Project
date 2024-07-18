import { useContext } from 'react'
import { EditUserContext } from '../contexts/UserEditContext'

export default function useEditUser() {
  return useContext(EditUserContext)
}
