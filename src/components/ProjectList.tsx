import React from 'react'
import { Link } from 'react-router-dom'
import { useUserProjects } from '../hooks/useUserProjects'
import { useSelectedProject } from '../contexts/SelectedProjectContext'
import type { Project } from '../types/types'

const ProjectList = () => {
  const { projects, loading, error } = useUserProjects()
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
        <div className='grid gap-3 p-2'>
          {projects.map(project => (
            <div
              key={project.id}
              onClick={() => handleSelect(project)}
              className='cursor-pointer bg-white border border-gray-200 shadow hover:shadow-lg transition rounded-lg p-4'
            >
              <h3 className='text-lg font-semibold text-blue-700'>
                {project.name}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectList
