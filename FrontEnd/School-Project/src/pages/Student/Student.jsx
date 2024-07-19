import { useEffect, useState } from 'react'
import { Container } from '../../styles/GlobalStyles'
import { useLoaderData, useParams } from 'react-router-dom'
import { Form } from './styled'
import { toast } from 'react-toastify'
import isEmail from 'validator/lib/isEmail'
import { isFloat, isInt } from 'validator'
import useEditStudent from '../../hooks/Student/useEditStudent'

export default function Student() {
  const { id } = useParams()
  const student = useLoaderData()
  const [formData, setFormData] = useState({})
  const { editStudent, createStudent } = useEditStudent()

  useEffect(() => {
    if (id && student) {
      setFormData(student)
    }
  }, [student, id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, lastName, email, age, weight, height } = formData
    // console.log(data)
    let formErrors = false

    if (name?.length < 3 || name?.length > 255) {
      toast.error('Nome precisa ter entre 3 e 255 caracteres')
      formErrors = true
    }

    if (lastName?.length < 3 || lastName?.length > 255) {
      toast.error('Sobrenome precisa ter entre 3 e 255 caracteres')
      formErrors = true
    }

    if (email !== undefined && !isEmail(email)) {
      toast.error('E-mail inválido')
      formErrors = true
    }

    if (age !== undefined && !isInt(String(age))) {
      toast.error('Idade inválida')
      formErrors = true
    }

    if (weight !== undefined && !isFloat(String(weight))) {
      toast.error('Peso inválido')
      formErrors = true
    }

    if (height !== undefined && !isFloat(String(height))) {
      toast.error('Altura inválida')
      formErrors = true
    }

    if (formErrors) return

    if (id) {
      const updatedData = { ...formData, id }
      editStudent(updatedData)
      return
    }

    await createStudent(formData)
    setFormData({})
  }

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget
    setFormData((state) => ({ ...state, [name]: value }))
  }

  return (
    <Container>
      <h1>{id ? 'Edit Student' : 'New Student'}</h1>
      <Form onSubmit={handleSubmit}>
        {id ? (
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            placeholder="Name"
          />
        ) : (
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
        )}
        {id ? (
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
        ) : (
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleInputChange}
            placeholder="Last Name"
            required
          />
        )}
        {id ? (
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleInputChange}
            placeholder="Email"
          />
        ) : (
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
        )}

        {id ? (
          <input
            type="number"
            name="age"
            value={formData.age || ''}
            onChange={handleInputChange}
            placeholder="Age"
          />
        ) : (
          <input
            type="number"
            name="age"
            value={formData.age || ''}
            onChange={handleInputChange}
            placeholder="Age"
            required
          />
        )}
        {id ? (
          <input
            type="text"
            name="weight"
            value={formData.weight || ''}
            onChange={handleInputChange}
            placeholder="Weight"
          />
        ) : (
          <input
            type="text"
            name="weight"
            value={formData.weight || ''}
            onChange={handleInputChange}
            placeholder="Weight"
            required
          />
        )}
        {id ? (
          <input
            type="text"
            name="height"
            value={formData.height || ''}
            onChange={handleInputChange}
            placeholder="Height"
          />
        ) : (
          <input
            type="text"
            name="height"
            value={formData.height || ''}
            onChange={handleInputChange}
            placeholder="Height"
            required
          />
        )}

        <button type="submit">Send</button>
      </Form>
    </Container>
  )
}
