import { createContext } from 'react'
import PropTypes from 'prop-types'

AuthContextProvider.propTypes = {
  children: PropTypes.node,
}

export const AuthContext = createContext()

export function AuthContextProvider({ children }) {
  return <AuthContext.Provider>{children}</AuthContext.Provider>
}
