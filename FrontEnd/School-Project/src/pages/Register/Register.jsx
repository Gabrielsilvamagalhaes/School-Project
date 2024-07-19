import { Container } from '../../styles/GlobalStyles'
import { Form } from './styled'
import { useEffect, useState } from 'react'

import useUser from '../../hooks/User/useUser'
import userFormsValidator from '../../services/userValidator'
import useAuth from '../../hooks/Authentication/useAuth'
import useEditUser from '../../hooks/User/useEditUser'

export default function Register() {
  const { user, modUser } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { create } = useUser()
  const { edit } = useEditUser()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }
    const formErrors = userFormsValidator(user.id, data, true)

    if (formErrors) return

    if (user.id) {
      await edit({
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined,
      })

      modUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      return
    } else {
      create({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    }
  }

  useEffect(() => {
    if (user.id) {
      setFormData({ name: user.name, email: user.email })
    }
    return
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((state) => {
      const newState = { ...state, [name]: value }
      return newState
    })
  }

  return (
    <Container>
      <h1>{user.id ? 'Edit your account' : 'Create your account'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          {user.id ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              minLength={3}
              maxLength={255}
            />
          ) : (
            <input
              type="text"
              required
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              minLength={3}
              maxLength={255}
            />
          )}
        </label>
        <label htmlFor="email">
          Email:
          {user.id ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your email"
            />
          ) : (
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your email"
            />
          )}
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Your password"
            minLength={6}
            maxLength={50}
          />
        </label>
        <button type="submit">{user.id ? 'Save' : 'Create Account'}</button>
      </Form>
    </Container>
  )
}
