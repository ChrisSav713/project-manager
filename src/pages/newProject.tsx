import React from 'react'
import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useUserProjects } from '../hooks/useUserProjects'

const newProject = () => {
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()
  const { addProject } = useUserProjects()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      await addProject(name, description)
      setName('')
      setDescription('')
      navigate('/dashboard')
    } catch (err) {
      console.error('Error creating project:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-md mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Create New Project</h2>
      <input
        type='text'
        placeholder='Project Name'
        value={name}
        onChange={e => setName(e.target.value)}
        className='w-full p-2 mb-3 border rounded'
        required
      />
      <textarea
        placeholder='Description (optional)'
        value={description}
        onChange={e => setDescription(e.target.value)}
        className='w-full p-2 mb-3 border rounded'
      />
      <button
        type='submit'
        className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Add Project
      </button>
    </form>
  )
}

export default newProject
