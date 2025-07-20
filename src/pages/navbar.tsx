import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className='bg-gray-800 text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full shadow-md z-50'>
      <Link to='/' className='text-xl font-bold'>
        DevTool
      </Link>

      <div className='flex gap-4 items-center'>
        {user ? (
          <>
            <span className='text-sm'>
              Hello, {user.displayName || user.email}
            </span>
            <Link to='/dashboard'>
              <button className='bg-blue-700 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded'>
                Dashboard
              </button>
            </Link>
            <button
              onClick={logout}
              className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded'
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login'>
              <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded'>
                Log In
              </button>
            </Link>
            <Link to='/signup'>
              <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded'>
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
