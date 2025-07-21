import React, { useState, useEffect } from 'react'
import type { Task, TaskPriority, TaskStatus } from '../types/types'
import { Timestamp } from 'firebase/firestore'

type EditTaskFormProps = {
  task: Task
  onSubmit: (updatedTask: {
    title: string
    description?: string
    status: TaskStatus
    priority: TaskPriority
    dueDate?: Date
  }) => void
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onSubmit }) => {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [status, setStatus] = useState<TaskStatus>(task.status)
  const [priority, setPriority] = useState<TaskPriority>(task.priority)
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.toDate().toISOString().slice(0, 10) : ''
  )

  useEffect(() => {
    // Rehydrate form if the task prop changes (optional safety net)
    setTitle(task.title)
    setDescription(task.description)
    setStatus(task.status)
    setPriority(task.priority)
    setDueDate(
      task.dueDate ? task.dueDate.toDate().toISOString().split('T')[0] : ''
    )
  }, [task])

  const newTask = {
    title: title.trim(),
    status,
    priority,
    dueDate: new Date(dueDate)
  } as any

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onSubmit({
      title: title.trim(),
      description: description,
      status,
      priority,
      dueDate: new Date(dueDate)
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-xl mx-auto p-6 bg-white rounded shadow space-y-4'
    >
      <h2 className='text-2xl font-bold'>Edit Task</h2>

      {/* Title */}
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

      {/* Description */}
      <div>
        <label className='block text-sm font-medium'>Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className='w-full border px-3 py-2 rounded'
        />
      </div>

      {/* Status */}
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

      {/* Priority */}
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

      {/* Due Date */}
      <div>
        <label className='block text-sm font-medium'>Due Date</label>
        <input
          type='date'
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          className='w-full border px-3 py-2 rounded'
        />
      </div>

      {/* Submit */}
      <div className='flex justify-end'>
        <button
          type='submit'
          className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded'
        >
          Update Task
        </button>
      </div>
    </form>
  )
}

export default EditTaskForm
