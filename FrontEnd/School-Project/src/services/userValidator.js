import { toast } from 'react-toastify'
import { isEmail } from 'validator'

export default function userFormsValidator(
  id,
  { name, email, password },
  isAFormsRegister
) {
  let formErrors = false

  if (isAFormsRegister) {
    if (name.length < 3 || name.length > 255) {
      formErrors = true
      toast.error('Name must have between 3 and 255 characters')
    }
  }

  if ((id && email) || !id) {
    if (!isEmail(email)) {
      formErrors = true
      toast.error('Invalid email')
    }
  }

  if (password.length < 6 || password.length > 50) {
    formErrors = true
    toast.error('Password must have between 6 and 50 characters')
  }

  return formErrors
}
