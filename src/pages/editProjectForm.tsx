// pages/EditProjectForm.tsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const editProjectForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return
      const docRef = doc(db, 'projects', id)
      const snapshot = await getDoc(docRef)
      const data = snapshot.data()
      if (data) {
        setName(data.name || '')
        setDescription(data.description || '')
      }
    }
    fetchProject()
  }, [id])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    try {
      const docRef = doc(db, 'projects', id)
      await updateDoc(docRef, {
        name,
        description
      })
      navigate('/dashboard')
    } catch (err) {
      console.error('Error updating project:', err)
    }
  }

  return (
    <form onSubmit={handleUpdate} className='max-w-md mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Edit Project</h2>
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
        Save Changes
      </button>
    </form>
  )
}

export default editProjectForm
