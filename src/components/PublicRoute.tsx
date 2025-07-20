import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  return user ? <Navigate to='/dashboard' /> : children
}

export default PublicRoute
