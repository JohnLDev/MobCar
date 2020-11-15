/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/ban-types */
// eslint-disable-next-line no-use-before-define
import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api'
import User from '../dtos/UserDTO'

interface signInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  signIn(credentials: signInCredentials): Promise<void>
  signOut(): void
  user: User
}

interface AuthState {
  token: string
  user: User
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)
export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@MobCar:token')
    const user = localStorage.getItem('@MobCar:user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }
    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/user/login', { email, password })
    const { token, user } = response.data

    localStorage.setItem('@MobCar:token', token)
    localStorage.setItem('@MobCar:user', JSON.stringify(user))

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@MobCar:token')
    localStorage.removeItem('@MobCar:user')

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
