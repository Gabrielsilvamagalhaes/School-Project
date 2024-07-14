import { Link } from 'react-router-dom'
import { Nav } from './Styled'
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa'

export default function Header() {
  return (
    <>
      <Nav>
        <Link to={'/home'}>
          <FaHome size={24} />
        </Link>
        <Link to={'profile'}>
          <FaUserAlt size={24} />
        </Link>
        <Link to={'/log-out'}>
          <FaSignInAlt size={24} />
        </Link>
      </Nav>
    </>
  )
}
