import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa'

import { Container } from '../../styles/GlobalStyles'
import { StudentContainer, ProfilePicture } from './styled'
import Loading from '../../components/Loading/Loading'
import useAuth from '../../hooks/useAuth'
import { useStudentsData } from '../../hooks/useStudentsData'
import { useRemoveStudent } from '../../hooks/useRemoveStudent'
import { useEffect } from 'react'

export default function Students() {
  const { data, isLoading } = useStudentsData()
  const { mutateAsync, isPending, isSuccess, isError } = useRemoveStudent()
  const { jwtToken } = useAuth()

  const handleRemoveStudent = async (e, id, index) => {
    e.preventDefault()
    if (jwtToken) {
      const isRemove = confirm('Tem certeza que deseja remover o estudante?')

      if (isRemove) {
        await mutateAsync(id)
        data.splice(index, 1)
      }
    } else {
      toast.error('Você precisa estar logado para remover um estudante')
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Student removed successfully')
    }
    if (isError) {
      toast.error('An error occurred while trying to remove the student')
    }
  }, [isSuccess, isError])

  return (
    <Container>
      <h1>Students</h1>
      <StudentContainer>
        {(isLoading && <Loading />) || (isPending && <Loading />)}

        {data?.length > 0 ? (
          data?.map((student, index) => (
            <div key={student.id} style={{ margin: '10px' }}>
              {student?.photos[0]?.url ? (
                <ProfilePicture>
                  <img src={student?.photos[0]?.url} alt="Student photo" />
                </ProfilePicture>
              ) : (
                <FaUserCircle size={36} />
              )}
              <span>{student.name}</span>
              <span>{student.email}</span>

              <Link to={`/student/${student.id}/edit`}>
                <FaEdit size={16} />
              </Link>
              <Link
                onClick={(e) => handleRemoveStudent(e, student.id, index)}
                to={'/'}
              >
                <FaWindowClose size={16} />
              </Link>
            </div>
          ))
        ) : (
          <h3>No students added</h3>
        )}
      </StudentContainer>
    </Container>
  )
}
