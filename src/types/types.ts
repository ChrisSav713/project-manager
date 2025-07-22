import { Timestamp } from 'firebase/firestore'

export interface Project {
  id: string
  name: string
  description?: string
  createdAt?: Timestamp
  ownerId: string
}

// You can now just use `Project` instead of `SelectedProject`

export type TaskStatus = 'To Do' | 'In Progress' | 'Done'
export type TaskPriority = 'Low' | 'Medium' | 'High'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: Timestamp
  projectId: string
  createdAt: Timestamp
  updatedAt: Timestamp
  ownerId: string
}

// Optional type for creating new tasks (no id or timestamps required)
export type NewTaskInput = Omit<
  Task,
  'id' | 'createdAt' | 'updatedAt' | 'ownerId'
>

export type Comment = {
  id: string
  content: string
  authorId: string
  createdAt: Timestamp
}

export type NewComment = {
  content: string
  authorId: string
  createdAt: Timestamp
}
