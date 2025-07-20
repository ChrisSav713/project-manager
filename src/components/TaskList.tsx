import { useSelectedProject } from '../contexts/SelectedProjectContext'
import { useUserTasks } from '../hooks/useUserTasks'

const TaskList = () => {
  const { selectedProject } = useSelectedProject()
  const { tasks, loading } = useUserTasks(selectedProject?.id || null)

  if (!selectedProject) return <p>Please select a project</p>

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  )
}

export default TaskList
