import ProjectForm from '../pages/ProjectForm'
import { useUserProjects } from '../hooks/useUserProjects'

const NewProjectPage = () => {
  const { addProject } = useUserProjects()

  return (
    <ProjectForm
      onSubmit={project => addProject(project)}
      submitLabel='Create Project'
    />
  )
}

export default NewProjectPage
