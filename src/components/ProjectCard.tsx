import React from 'react'
import { Link } from 'react-router-dom'
import { useSelectedProject } from '../contexts/SelectedProjectContext'
import { useUserProjects } from '../hooks/useUserProjects'
const ProjectCard = () => {
  const { selectedProject } = useSelectedProject()
  const { deleteProject } = useUserProjects()

  return (
    <div className='border rounded-lg shadow-sm p-6 bg-white max-w-xl w-full'>
      <div className='flex justify-between items-center mb-4'>
        {selectedProject && (
          <>
            <h2 className='text-2xl font-bold'>{selectedProject.name}</h2>

            <div className='flex gap-2'>
              <Link to={`/edit/${selectedProject.id}`} title='Edit Project'>
                <div className='w-5 h-5 text-yellow-600 hover:text-yellow-700'></div>
              </Link>
              <button
                onClick={() => deleteProject(selectedProject.id)}
                title='Delete Project'
                className='text-red-600 hover:text-red-700'
              >
                <div className='w-5 h-5'></div>
              </button>
            </div>

            <p className='text-gray-700 mb-4'>
              {selectedProject.description || (
                <em className='text-gray-400'>No description provided.</em>
              )}
            </p>

            <div className='text-sm text-gray-500 space-y-1'>
              <p>
                <span className='font-semibold'>Owner ID:</span>{' '}
                {selectedProject.ownerId}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProjectCard
