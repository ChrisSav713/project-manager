import { useReducer } from 'react'
import type { Task, TaskPriority, TaskStatus } from '../types/types'
import { Timestamp } from 'firebase/firestore'

type TaskFormState = {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string // always a date string like '2025-07-21'
}

type TaskFormAction =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_DESCRIPTION'; payload: string }
  | { type: 'SET_STATUS'; payload: TaskStatus }
  | { type: 'SET_PRIORITY'; payload: TaskPriority }
  | { type: 'SET_DUE_DATE'; payload: string }
  | { type: 'RESET'; payload?: Task } // resets with default or existing task

const initialState: TaskFormState = {
  title: '',
  description: '',
  status: 'To Do',
  priority: 'Medium',
  dueDate: ''
}

function reducer (state: TaskFormState, action: TaskFormAction): TaskFormState {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload }
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload }
    case 'SET_STATUS':
      return { ...state, status: action.payload }
    case 'SET_PRIORITY':
      return { ...state, priority: action.payload }
    case 'SET_DUE_DATE':
      return { ...state, dueDate: action.payload }
    case 'RESET':
      if (!action.payload) return initialState

      return {
        title: action.payload.title,
        description: action.payload.description || '',
        status: action.payload.status,
        priority: action.payload.priority,
        dueDate: timestampToDateString(action.payload.dueDate)
      }

    default:
      return state
  }
}

export function useTaskFormReducer (initialTask?: Task) {
  const [state, dispatch] = useReducer(reducer, initialTask, task =>
    task
      ? {
          title: task.title,
          description: task.description || '',
          status: task.status,
          priority: task.priority,
          dueDate: timestampToDateString(task.dueDate)
        }
      : initialState
  )

  return { state, dispatch }
}

// 🔄 Converts Firestore Timestamp or Date to date string
function timestampToDateString (ts?: Timestamp): string {
  if (!ts) return ''
  const d = ts instanceof Timestamp ? ts.toDate() : ts
  return d.toISOString().split('T')[0]
}
