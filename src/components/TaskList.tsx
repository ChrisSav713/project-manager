import React from 'react'
import { useSelectedProject } from '../contexts/SelectedProjectContext'
import { useUserTasks } from '../hooks/useUserTasks'
import { useNavigate } from 'react-router-dom'

const TaskList: React.FC = () => {
  const { selectedProject } = useSelectedProject()
  const { tasks, loading, error } = useUserTasks(selectedProject?.id || null)
  const navigate = useNavigate()

  if (!selectedProject) {
    return <p className='text-gray-500 italic'>Please select a project.</p>
  }

  if (loading) return <p>Loading tasks...</p>
  if (error) return <p className='text-red-500'>Error loading tasks.</p>
  if (tasks.length === 0) return <p>No tasks for this project yet.</p>

  return (
    <div className='grid gap-4'>
      {tasks.map(task => (
        <div
          key={task.id}
          onClick={() => navigate(`/task/edit/${task.id}`)}
          className='cursor-pointer bg-white border border-gray-200 shadow hover:shadow-lg transition rounded-lg p-4'
        >
          <h3 className='text-lg font-semibold text-blue-700'>{task.title}</h3>
          {task.description && (
            <p className='text-gray-600 text-sm mb-1'>{task.description}</p>
          )}
          <div className='text-xs text-gray-500 flex gap-4'>
            <span>Status: {task.status}</span>
            <span>Priority: {task.priority}</span>
            <span>
              Due:{' '}
              {task.dueDate?.toDate
                ? task.dueDate.toDate().toLocaleDateString()
                : '—'}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList
