import React from 'react'
import NewTaskForm from './newTaskForm'
import { useUserTasks } from '../hooks/useUserTasks'
import { useSelectedProject } from '../contexts/SelectedProjectContext'

const NewTaskPage = () => {
  const { selectedProject } = useSelectedProject()
  const { addTask } = useUserTasks(selectedProject?.id || null)

  if (!selectedProject) return <p>Please select a project first.</p>

  return (
    <NewTaskForm
      onSubmit={task =>
        addTask({
          ...task,
          projectId: selectedProject.id
        })
      }
    />
  )
}

export default NewTaskPage
