import { useStudentsData } from '../../hooks/useStudentsData'

import { Link } from 'react-router-dom'

import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa'

import { Container } from '../../styles/GlobalStyles'
import { StudentContainer, ProfilePicture } from './styled'

export default function Students() {
  const { data, isLoading } = useStudentsData()
  console.log(data)

  return (
    <Container>
      <h1>Students</h1>
      <StudentContainer>
        {isLoading ? (
          <p>Loading...</p>
        ) : data.length > 0 ? (
          data?.map((student) => (
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
              <Link to={`/student/${student.id}/delete`}>
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
