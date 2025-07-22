import { useUserProjects } from '../hooks/useUserProjects'
import Layout from '../components/Layout'

const Dashboard = () => {
  const { loading, error } = useUserProjects()

  if (loading) return <p className='text-center mt-10'>Loading projects...</p>

  if (error) {
    return (
      <p className='text-center mt-10 text-red-600'>
        Failed to load projects. Please try again later.
      </p>
    )
  }

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <div className='flex items-center justify-between mb-4'></div>
      <Layout />
    </div>
  )
}

export default Dashboard
