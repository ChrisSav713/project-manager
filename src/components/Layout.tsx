import React, { useState } from 'react'
import ProjectList from './ProjectList'
import TaskModal from './TaskModal'
import { useSelectedProject } from '../contexts/SelectedProjectContext'

const Layout = () => {
  const [showModal, setShowModal] = useState(false)
  const { selectedProject } = useSelectedProject()
  return (
    <div className='flex h-screen flex-col md:flex-row'>
      {/* Sidebar for Desktop */}
      <aside className='hidden md:flex md:flex-col w-64 bg-gray-100 border-r'>
        <h2 className='text-lg font-bold p-4 border-b'>Projects</h2>
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
        <h1 className='text-2xl font-bold mb-4'>
          {selectedProject && (
            <>
              <button onClick={() => setShowModal(true)}>+ New Task</button>
              {showModal && (
                <TaskModal
                  projectId={selectedProject.id}
                  onClose={() => setShowModal(false)}
                />
              )}
            </>
          )}
        </h1>
        {/* Render tasks here */}
        <div className='bg-gray-50 p-4 rounded shadow'>
          <p>This is where your task board or task list will go.</p>
        </div>
      </main>
    </div>
  )
}

export default Layout
