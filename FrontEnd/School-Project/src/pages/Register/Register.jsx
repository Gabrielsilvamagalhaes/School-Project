import { Container } from '../../styles/GlobalStyles'
import { Form } from './styled'

import useUser from '../../hooks/useUser'
import { useState } from 'react'
import userFormsValidator from '../../services/userValidator'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { create } = useUser()

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }
    const formErrors = userFormsValidator(data, true)

    if (formErrors) return

    create({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((state) => {
      const newState = { ...state, [name]: value }
      return newState
    })
  }

  return (
    <Container>
      <h1>Create your account</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
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
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your email"
          />
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
        <button type="submit">Create Account</button>
      </Form>
    </Container>
  )
}
