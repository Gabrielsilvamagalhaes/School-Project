import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'

export default function Root() {
  return (
    <>
      <Header />
      <h2>School Project</h2>
      <Outlet />
    </>
  )
}
