import ProjectList from './ProjectList'
import { useSelectedProject } from '../contexts/SelectedProjectContext'
import ProjectCard from '../components/ProjectCard'
import { Link, useNavigate } from 'react-router-dom'
import TaskList from './TaskList'

const Layout = () => {
  const { selectedProject } = useSelectedProject()
  const navigate = useNavigate()

  const handleNewTask = () => {
    if (selectedProject) {
      navigate('/task/new')
    } else {
      alert('Please select a project first.')
    }
  }

  return (
    <div className='flex h-screen flex-col md:flex-row'>
      {/* Sidebar for Desktop */}
      <aside className='hidden md:flex md:flex-col w-64 bg-gray-100 border-r'>
        <div className='flex justify-between items-center border-b'>
          <h2 className='text-xl font-bold p-4'>Projects</h2>

          <div className='flex flex-col gap-2'>
            <Link to='/newproject'>
              <button className='mr-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                + New Project
              </button>
            </Link>
          </div>
        </div>
        <ProjectList />
      </aside>

      {/* Topbar for Mobile */}
      <div className='md:hidden bg-gray-100 border-b p-4'>
        <h2 className='text-lg font-bold'>Projects</h2>
        <ProjectList />
      </div>

      {/* Mobile Project Selector */}
      <div className='md:hidden bg-white border-b overflow-x-auto whitespace-nowrap'></div>

      {/* Main Content */}
      <main className='flex-1 overflow-y-auto p-4'>
        <h1 className='text-2xl font-bold mb-4'></h1>
        <ProjectCard />

        <div className='bg-gray-50 p-4 rounded shadow space-y-4'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-bold'>Tasks</h2>
            <button
              onClick={handleNewTask}
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
            >
              + New Task
            </button>
          </div>

          <TaskList />
        </div>
      </main>
    </div>
  )
}

export default Layout
