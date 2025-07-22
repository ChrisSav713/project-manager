import { useUserTasks } from '../hooks/useUserTasks'
import { useSelectedProject } from '../contexts/SelectedProjectContext'
import TaskForm from '../pages/TaskForm'
import { Timestamp } from 'firebase/firestore'

const NewTaskPage = () => {
  const { selectedProject } = useSelectedProject()
  const { addTask } = useUserTasks(selectedProject?.id || null)

  if (!selectedProject) return <p>Please select a project first.</p>

  return (
    <TaskForm
      onSubmit={task =>
        addTask({
          ...task,
          projectId: selectedProject.id,
          dueDate: task.dueDate ? Timestamp.fromDate(task.dueDate) : undefined
        })
      }
      submitLabel='Create Task'
    />
  )
}

export default NewTaskPage
