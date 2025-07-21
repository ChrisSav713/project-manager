import React from 'react'
import { Link } from 'react-router-dom'
import { useUserProjects } from '../hooks/useUserProjects'
import { useSelectedProject } from '../contexts/SelectedProjectContext'
import type { Project } from '../types/types'

const ProjectList = () => {
  const { projects, loading, error, deleteProject } = useUserProjects()
  const { setSelectedProject } = useSelectedProject()

  const handleSelect = (project: Project) => {
    console.log('Selected Project = ' + project.name)
    setSelectedProject(project)
  }

  if (loading) return <p className='text-center mt-10'>Loading projects...</p>

  if (error) {
    return (
      <p className='text-center mt-10 text-red-600'>
        Failed to load projects. Please try again later.
      </p>
    )
  }

  return (
    <div>
      {projects.length === 0 ? (
        <p>
          No projects yet.{' '}
          <a href='/newproject' className='text-blue-600 underline'>
            Create one
          </a>
        </p>
      ) : (
        <div className='grid gap-4'>
          {projects.map(project => (
            <div
              key={project.id}
              onClick={() => handleSelect(project)}
              className='border p-4 rounded shadow-sm bg-white flex justify-between items-start'
            >
              <div>
                <h3 className='text-xl font-semibold'>{project.name}</h3>
                <p className='text-gray-600'>
                  {project.description || 'No description'}
                </p>
                <p className='text-sm text-gray-400 mt-2'>
                  Created:{' '}
                  {project.createdAt?.toDate?.().toLocaleString() || 'N/A'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectList
