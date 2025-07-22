import { useParams } from 'react-router-dom'
import { useUserProjects } from '../hooks/useUserProjects'
import { useSelectedProject } from '../contexts/SelectedProjectContext'
import ProjectForm from '../pages/ProjectForm'

const EditProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const { selectedProject } = useSelectedProject()
  const { projects, updateProject } = useUserProjects()

  const project = projects.find(p => p.id === projectId)

  if (!selectedProject) return <p>Please select a project first.</p>
  if (!project) return <p>Project not found.</p>

  return (
    <ProjectForm
      onSubmit={updates => updateProject(project.id, updates)}
      submitLabel='Update Project'
    />
  )
}

export default EditProjectPage
