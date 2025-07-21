import React from 'react'
import { useParams } from 'react-router-dom'
import EditTaskForm from './editTaskForm'
import { useUserTasks } from '../hooks/useUserTasks'
import { useSelectedProject } from '../contexts/SelectedProjectContext'
import { Timestamp } from 'firebase/firestore'

const EditTaskPage = () => {
  const { taskId } = useParams()
  const { selectedProject } = useSelectedProject()
  const { tasks, updateTask } = useUserTasks(selectedProject?.id || null)

  const task = tasks.find(t => t.id === taskId)

  if (!selectedProject) return <p>Please select a project first.</p>
  if (!task) return <p>Task not found.</p>

  return (
    <EditTaskForm
      task={task}
      onSubmit={updates =>
        updateTask(task.id, {
          ...updates,
          dueDate: updates.dueDate
            ? Timestamp.fromDate(updates.dueDate)
            : undefined
        })
      }
    />
  )
}

export default EditTaskPage
