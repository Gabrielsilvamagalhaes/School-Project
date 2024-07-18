import axios from 'axios'
import cookies from './cookie'

const token = cookies.get('jwt_authorization')
console.log(token)
if (token) {
  axios.defaults.headers.authorization = `Bearer ${token}`
}
export default axios.create({
  baseURL: 'http://localhost:3000',
})
