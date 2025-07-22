import React from 'react'
import { useProjectFormReducer } from '../hooks/useProjectFormReducer'

type ProjectFormProps = {
  onSubmit: (project: {
    name: string
    description: string
  }) => void | Promise<void>
  initialProject?: { name: string; description: string }
  mode?: 'create' | 'edit'
  submitLabel?: string
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  onSubmit,
  mode = 'create'
}) => {
  const { state, dispatch } = useProjectFormReducer(undefined)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name: state.name.trim(),
      description: state.description.trim()
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-xl mx-auto p-6 bg-white rounded shadow space-y-4'
    >
      <h2 className='text-2xl font-bold'>
        {mode === 'edit' ? 'Edit Project' : 'Create New Project'}
      </h2>

      {/* Project Name */}
      <div>
        <label className='block text-sm font-medium'>Project Name</label>
        <input
          type='text'
          value={state.name}
          onChange={e =>
            dispatch({ type: 'SET_NAME', payload: e.target.value })
          }
          className='w-full border px-3 py-2 rounded'
          required
        />
      </div>

      {/* Project Description */}
      <div>
        <label className='block text-sm font-medium'>Description</label>
        <textarea
          value={state.description}
          onChange={e =>
            dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })
          }
          className='w-full border px-3 py-2 rounded'
        />
      </div>

      {/* Submit Button */}
      <div className='flex justify-end'>
        <button
          type='submit'
          className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded'
        >
          {mode === 'edit' ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  )
}

export default ProjectForm
