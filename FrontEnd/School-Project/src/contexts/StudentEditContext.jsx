import { createContext, useEffect } from 'react'
import { toast } from 'react-toastify'

import { draggable, pauseOnHover, theme } from '../config/toastifyOptions'
import PropTypes from 'prop-types'
import Loading from '../components/Loading/Loading'

import { useStudentEditMutate } from '../hooks/Student/useStudentEditMutate'
import axios from '../services/axios'
export const EditStudentContext = createContext({})

EditStudentContextProvider.propTypes = {
  children: PropTypes.node,
}

export function EditStudentContextProvider({ children }) {
  const { mutateAsync, isSuccess, isError, error, isPending } =
    useStudentEditMutate()

  const editStudent = async ({
    id,
    name,
    lastName,
    email,
    age,
    weight,
    height,
  }) => {
    await mutateAsync({ id, name, lastName, email, age, weight, height })
  }

  const createStudent = async ({
    name,
    lastName,
    email,
    age,
    weight,
    height,
  }) => {
    const response = await axios
      .post('/students', {
        name,
        lastName,
        email,
        age,
        weight,
        height,
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 'Erro ao criar aluno', {
          theme,
          pauseOnHover,
          draggable,
        })
        console.clear()
      })

    return (
      response.status === 201 &&
      toast.success('Aluno criado com sucesso!', {
        theme,
        pauseOnHover,
        draggable,
      })
    )
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Sucesso ao salvar dados!', {
        theme,
        pauseOnHover,
        draggable,
      })
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      toast.error(
        error?.response?.data?.message || 'Dados para edição inválidos',
        {
          theme,
          pauseOnHover,
          draggable,
        }
      )
    }
  }, [isError, error])

  const student = {
    editStudent,
    createStudent,
  }

  return (
    <EditStudentContext.Provider value={student}>
      {isPending ? <Loading /> : children}
    </EditStudentContext.Provider>
  )
}
