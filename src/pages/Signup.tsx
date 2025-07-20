import { useAuth } from '../auth/AuthContext'
import { useState } from 'react'
import GoogleButton from '../components/GoogleButton'

const Signup = () => {
  const { signup, loginWithGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signup(email, password)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition'
          >
            Sign Up
          </button>
        </form>
        <div className='my-4 text-center text-gray-500'>or</div>
        <GoogleButton onClick={loginWithGoogle} label='Log in with Google' />
      </div>
    </div>
  )
}

export default Signup
