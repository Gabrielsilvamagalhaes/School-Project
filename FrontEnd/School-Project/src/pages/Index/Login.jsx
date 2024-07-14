import { Title } from './styled'
import { Container } from '../../styles/GlobalStyles'

import { toast } from 'react-toastify'

export default function Login() {
  return (
    <Container>
      <Title isRed={false}>Login Page</Title>
      <small>Fala tu lato</small>
      <button
        type="button"
        onClick={() =>
          toast.success('Sucess  my brother!', {
            pauseOnHover: false,
            theme: 'dark',
            draggable: true,
          })
        }
      >
        Send
      </button>
      <a href="">aaaaaaaaaaaa</a>
    </Container>
  )
}
