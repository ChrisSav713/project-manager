import { useEffect, useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  addDoc,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../auth/AuthContext'
import type { Project } from '../types/types'

export function useUserProjects () {
  const { user } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return
      try {
        const q = query(
          collection(db, 'projects'),
          where('ownerId', '==', user.uid)
        )
        const snapshot = await getDocs(q)
        const projectList: Project[] = snapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            createdAt: data.createdAt?.toDate?.() ?? null,
            ownerId: data.ownerId
          }
        })

        setProjects(projectList)
        setError(false)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [user])

  const addProject = async (name: string, description: string) => {
    if (!user) return

    const docRef = await addDoc(collection(db, 'projects'), {
      name,
      description,
      ownerId: user.uid,
      createdAt: serverTimestamp()
    })

    setProjects(prev => [
      ...prev,
      {
        id: docRef.id,
        name,
        description,
        createdAt: Timestamp.fromDate(new Date()), // display fallback
        ownerId: user.uid
      }
    ])
  }

  const deleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'projects', id))
      setProjects(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      console.error('Error deleting project:', err)
    }
  }

  return { projects, loading, error, deleteProject, addProject }
}
