import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelectedProject } from '../contexts/SelectedProjectContext'
import { useUserProjects } from '../hooks/useUserProjects'

const ProjectCard = () => {
  const { selectedProject } = useSelectedProject()
  const { deleteProject } = useUserProjects()
  const navigate = useNavigate()

  const handleEdit = () => {
    if (selectedProject) {
      navigate(`/edit/${selectedProject.id}`)
    }
  }

  const handleDelete = () => {
    if (
      selectedProject &&
      window.confirm(
        `Are you sure you want to delete the project "${selectedProject.name}"?`
      )
    ) {
      deleteProject(selectedProject.id)
    }
  }

  if (!selectedProject) {
    return (
      <div className='text-center text-gray-500 italic'>
        No project selected.
      </div>
    )
  }

  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6'>
      <div className='flex justify-between items-start mb-4'>
        <h2 className='text-2xl font-semibold text-blue-800'>
          {selectedProject.name}
        </h2>
        <div className='flex gap-2'>
          <button
            onClick={handleEdit}
            title='Edit'
            className='text-sm hover:text-blue-600 transition'
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            title='Delete'
            className='text-sm hover:text-red-500 transition'
          >
            🗑️
          </button>
        </div>
      </div>

      {selectedProject.description && (
        <p className='text-gray-700 mb-2'>{selectedProject.description}</p>
      )}

      <p className='text-sm text-gray-500'>
        <strong>ID:</strong> {selectedProject.id}
      </p>
      <p className='text-sm text-gray-500'>
        <strong>Owner:</strong> {selectedProject.ownerId}
      </p>
      <p className='text-sm text-gray-500'>
        <strong>Created:</strong>{' '}
        {selectedProject.createdAt?.toDate
          ? selectedProject.createdAt.toDate().toLocaleDateString()
          : '—'}
      </p>
    </div>
  )
}

export default ProjectCard
