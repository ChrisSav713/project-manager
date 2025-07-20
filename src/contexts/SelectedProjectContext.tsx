import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type SelectedProject = {
  id: string
  name: string
  description: string
}

type SelectedProjectContextType = {
  selectedProject: SelectedProject | null
  setSelectedProject: (project: SelectedProject | null) => void
}

const SelectedProjectContext = createContext<
  SelectedProjectContextType | undefined
>(undefined)

export const SelectedProjectProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [selectedProject, setSelectedProject] =
    useState<SelectedProject | null>(null)

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
  if (!context) {
    throw new Error(
      'useSelectedProject must be used within a SelectedProjectProvider'
    )
  }
  return context
}
