import { useReducer } from 'react'
import type { Project } from '../types/types'

type ProjectFormState = {
  name: string
  description: string
}

type ProjectFormAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_DESCRIPTION'; payload: string }
  | { type: 'RESET'; payload?: Project }

const initialState: ProjectFormState = {
  name: '',
  description: ''
}

function reducer (
  state: ProjectFormState,
  action: ProjectFormAction
): ProjectFormState {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload }
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload }
    case 'RESET': {
      if (!action.payload) return initialState
      return {
        name: action.payload.name,
        description: action.payload.description || ''
      }
    }
    default:
      return state
  }
}

export function useProjectFormReducer (initialProject?: Project) {
  const [state, dispatch] = useReducer(reducer, initialProject, project =>
    project
      ? {
          name: project.name,
          description: project.description || ''
        }
      : initialState
  )
  return { state, dispatch }
}
