import type { FC } from 'react'
import { useState } from 'react'
import { useUserTasks } from '../hooks/useUserTasks'

type TaskModalProps = {
  onClose: () => void
  projectId: string
}

const TaskModal: FC<TaskModalProps> = ({ onClose, projectId }) => {
  const { addTask } = useUserTasks(projectId)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('Medium')

  const handleSubmit = async e => {
    e.preventDefault()
    await addTask({
      title,
      description,
      dueDate: new Date(dueDate),
      priority: 'Low',
      status: 'To Do',
      projectId
    })
    onClose()
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded shadow-lg w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-4'>New Task</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='text'
            placeholder='Title'
            className='w-full border p-2 rounded'
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder='Description'
            className='w-full border p-2 rounded'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            type='date'
            className='w-full border p-2 rounded'
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            className='w-full border p-2 rounded'
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <div className='flex justify-end gap-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-300 rounded'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 text-white rounded'
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default TaskModal
