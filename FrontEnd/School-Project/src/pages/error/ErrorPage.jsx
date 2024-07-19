import { useRouteError } from 'react-router-dom'
import { DivError } from './Styled'
import Header from '../../components/Header/Header'

export default function ErroPage() {
  const error = useRouteError()
  console.log(error)

  return (
    <>
      <Header />
      <DivError>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </DivError>
    </>
  )
}
