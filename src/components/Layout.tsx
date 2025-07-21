import React, { useState } from 'react'
import ProjectList from './ProjectList'
import { useSelectedProject } from '../contexts/SelectedProjectContext'
import ProjectCard from '../components/ProjectCard'
import { useUserProjects } from '../hooks/useUserProjects'
import { Link, useNavigate } from 'react-router-dom'

const Layout = () => {
  const { projects, loading, error, deleteProject } = useUserProjects()
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
        <h2 className='text-lg font-bold p-4 border-b'>Projects</h2>

        <div className='flex flex-col gap-2 ml-4'>
          <Link to='/newproject'>
            <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              + New Project
            </button>
          </Link>
          {selectedProject && (
            <>
              <Link to={`/edit/${selectedProject.id}`}>
                <button className='bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded'>
                  Edit
                </button>
              </Link>
              <button
                onClick={() => deleteProject(selectedProject.id)}
                className='bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded'
              >
                Delete
              </button>
            </>
          )}
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
          <div className='flex justify-end'>
            <button
              onClick={handleNewTask}
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
            >
              + New Task
            </button>
          </div>

          <p>This is where your task board or task list will go.</p>
        </div>
      </main>
    </div>
  )
}

export default Layout
