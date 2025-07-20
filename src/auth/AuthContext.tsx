import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

// Define the shape of the context
interface AuthContextType {
  user: User | null
  loading: boolean
  signup: (email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

// Create the context with an initial undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export function AuthProvider ({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Auth functions
  const signup = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
  }

  const logout = async () => {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook
export function useAuth () {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
