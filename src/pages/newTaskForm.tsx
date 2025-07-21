import React, { useState } from 'react'
import type { TaskPriority, TaskStatus, NewTaskInput } from '../types/types'
import { Timestamp } from 'firebase/firestore'

type NewTaskFormProps = {
  onSubmit: (task: NewTaskInput) => void
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<TaskStatus>('To Do')
  const [priority, setPriority] = useState<TaskPriority>('Medium')
  const [dueDate, setDueDate] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const parsedDueDate = dueDate
      ? Timestamp.fromDate(new Date(dueDate))
      : Timestamp.fromDate(new Date())

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate: parsedDueDate,
      projectId: '' // This must be injected from context or passed down later
    })

    // Clear form
    setTitle('')
    setDescription('')
    setStatus('To Do')
    setPriority('Medium')
    setDueDate('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-xl mx-auto p-6 bg-white rounded shadow space-y-4'
    >
      <h2 className='text-2xl font-bold'>Create New Task</h2>

      <div>
        <label className='block text-sm font-medium'>Title</label>
        <input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          className='w-full border px-3 py-2 rounded'
          required
        />
      </div>

      <div>
        <label className='block text-sm font-medium'>Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className='w-full border px-3 py-2 rounded'
        />
      </div>

      <div>
        <label className='block text-sm font-medium'>Status</label>
        <select
          value={status}
          onChange={e => setStatus(e.target.value as TaskStatus)}
          className='w-full border px-3 py-2 rounded'
        >
          <option value='To Do'>To Do</option>
          <option value='In Progress'>In Progress</option>
          <option value='Done'>Done</option>
        </select>
      </div>

      <div>
        <label className='block text-sm font-medium'>Priority</label>
        <select
          value={priority}
          onChange={e => setPriority(e.target.value as TaskPriority)}
          className='w-full border px-3 py-2 rounded'
        >
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </select>
      </div>

      <div>
        <label className='block text-sm font-medium'>Due Date</label>
        <input
          type='date'
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          className='w-full border px-3 py-2 rounded'
        />
      </div>

      <div className='flex justify-end'>
        <button
          type='submit'
          className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded'
        >
          Save Task
        </button>
      </div>
    </form>
  )
}

export default NewTaskForm
