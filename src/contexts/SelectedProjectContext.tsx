import React, { createContext, useContext, useState } from 'react'
import type { Project } from '../types/types'

type ContextType = {
  selectedProject: Project | null
  setSelectedProject: (project: Project | null) => void
}

const SelectedProjectContext = createContext<ContextType | undefined>(undefined)

export const SelectedProjectProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <SelectedProjectContext.Provider
      value={{ selectedProject, setSelectedProject }}
    >
      {children}
    </SelectedProjectContext.Provider>
  )
}

export const useSelectedProject = () => {
  const context = useContext(SelectedProjectContext)
  if (context === undefined) {
    throw new Error(
      'useSelectedProject must be used within a SelectedProjectProvider'
    )
  }
  return context
}
