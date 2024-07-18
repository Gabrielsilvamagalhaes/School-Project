import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

import { Form } from './styled'
import { Container } from '../../styles/GlobalStyles'
import useAuth from '../../hooks/useAuth'
import userFormsValidator from '../../services/userValidator'
import cookies from '../../services/cookie'
import Loading from '../../components/Loading/Loading'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { createToken, jwtToken, isPending } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = userFormsValidator(null, { email, password }, false)
    if (formErrors) return

    await createToken({ email, password })
  }
  const redirectLastPage = () => {
    const path = localStorage.getItem('redirectPath')
    const redirectPath = path ? JSON.parse(path) : '/'
    navigate(redirectPath)
  }

  useEffect(() => {
    if (jwtToken) {
      const token = cookies.get('jwt_authorization')
      if (token && typeof token === 'string') {
        try {
          const decodedToken = jwtDecode(token)
          console.log(decodedToken)
          redirectLastPage()
        } catch (error) {
          console.error('Invalid token', error)
        }
      } else {
        console.log('No valid token found')
      }
    }
  }, [jwtToken, navigate])

  return (
    <Container>
      <h1>Login</h1>
      {isPending && <Loading />}
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
        <button type="submit">Enter</button>
      </Form>
    </Container>
  )
}
