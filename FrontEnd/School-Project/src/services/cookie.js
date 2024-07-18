import Cookies from 'universal-cookie'

const cookies = new Cookies(
  null,
  { path: '/' },
  {
    secure: true,
    sameSite: 'none',
    httpOnly: true,
  }
)

export default cookies
