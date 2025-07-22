import React, { useState } from 'react'
import type { Task, TaskPriority, TaskStatus } from '../types/types'
import { useTaskFormReducer } from '../hooks/useTaskFormReducer'
import { useTaskComments } from '../hooks/useTaskComents'
import { Timestamp } from 'firebase/firestore'

type TaskFormProps = {
  task?: Task
  onSubmit: (updatedTask: {
    title: string
    description?: string
    status: TaskStatus
    priority: TaskPriority
    dueDate?: Date
  }) => void
  submitLabel?: string
}

const TaskForm: React.FC<TaskFormProps> = ({
  task,
  onSubmit,
  submitLabel = 'Save Task'
}) => {
  const { state, dispatch } = useTaskFormReducer(task)
  const taskId = task?.id ?? ''
  const { comments, addComment, deleteComment } = useTaskComments(taskId)

  const [newComment, setNewComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...state,
      dueDate: state.dueDate ? new Date(state.dueDate) : undefined
    })
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    await addComment({
      content: newComment.trim(),
      createdAt: Timestamp.fromDate(new Date()),
      authorId: 'Anonymous'
    })
    setNewComment('')
  }

  return (
    <div className='flex flex-col md:flex-row gap-6 max-w-7xl mx-auto px-4 py-6'>
      {/* LEFT: Task Form */}
      <form
        onSubmit={handleSubmit}
        className='md:w-1/2 bg-white rounded shadow p-6 space-y-4'
      >
        <h2 className='text-2xl font-bold'>{submitLabel}</h2>

        <div>
          <label className='block text-sm font-medium'>Title</label>
          <input
            type='text'
            value={state.title}
            onChange={e =>
              dispatch({ type: 'SET_TITLE', payload: e.target.value })
            }
            className='w-full border px-3 py-2 rounded'
            required
          />
        </div>

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

        <div>
          <label className='block text-sm font-medium'>Status</label>
          <select
            value={state.status}
            onChange={e =>
              dispatch({ type: 'SET_STATUS', payload: e.target.value as any })
            }
            className='w-full border px-3 py-2 rounded'
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium'>Priority</label>
          <select
            value={state.priority}
            onChange={e =>
              dispatch({ type: 'SET_PRIORITY', payload: e.target.value as any })
            }
            className='w-full border px-3 py-2 rounded'
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium'>Due Date</label>
          <input
            type='date'
            value={state.dueDate}
            onChange={e =>
              dispatch({ type: 'SET_DUE_DATE', payload: e.target.value })
            }
            className='w-full border px-3 py-2 rounded'
          />
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded'
          >
            {submitLabel}
          </button>
        </div>
      </form>

      {/* RIGHT: Comment Panel */}
      <div className='md:w-1/2 bg-slate-50 rounded shadow p-6 flex flex-col h-[550px]'>
        <h3 className='text-xl font-semibold mb-4'>Comments</h3>

        <div className='flex mb-4 gap-2'>
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder='Write a comment...'
            className='flex-1 border rounded px-3 py-2 resize-none'
          />
          <button
            onClick={handleAddComment}
            className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700'
          >
            ➕
          </button>
        </div>

        <div className='flex-1 overflow-y-auto space-y-3'>
          {comments.map(comment => (
            <div
              key={comment.id}
              className='bg-white border rounded p-3 text-sm text-gray-700 relative'
            >
              <p>{comment.content}</p>
              <span className='block text-xs text-gray-400 mt-1'>
                {comment.authorId} •{' '}
                {new Date(comment.createdAt.toDate()).toLocaleString()}
              </span>
              <button
                onClick={() => deleteComment(comment.id)}
                className='absolute top-1 right-2 text-gray-400 hover:text-red-500 text-xs'
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TaskForm
