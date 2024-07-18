import { Link, useNavigate } from 'react-router-dom'
import { Nav } from './Styled'
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
} from 'react-icons/fa'
import useAuth from '../../hooks/useAuth'

export default function Header() {
  const { jwtToken, logoutUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    logoutUser()
    navigate('/login')
  }

  return (
    <>
      <Nav>
        <Link to={'/'}>
          <FaHome size={24} />
        </Link>
        <Link to={'/register'}>
          <FaUserAlt size={24} />
        </Link>
        {jwtToken ? (
          <Link onClick={handleLogout} to={'/'}>
            <FaPowerOff size={24} />
          </Link>
        ) : (
          <Link to={'/login'}>
            <FaSignInAlt size={24} />
          </Link>
        )}
        {jwtToken && <FaCircle size={24} color="#66ff33" />}
      </Nav>
    </>
  )
}
