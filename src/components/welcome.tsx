import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center px-4'>
      <h1 className='text-4xl font-bold mb-6'>Welcome to Project Manager</h1>
      <p className='text-lg mb-8 text-gray-600'>
        Organize your work, track tasks, and collaborate effortlessly.
      </p>
      <div className='flex gap-4'>
        <Link to='/login'>
          <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Log In
          </button>
        </Link>
        <Link to='/signup'>
          <button className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Welcome
