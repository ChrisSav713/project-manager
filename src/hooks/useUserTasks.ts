import { useEffect, useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
  Timestamp,
  updateDoc
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../auth/AuthContext'
import type { Task, TaskStatus, TaskPriority } from '../types/types'

export function useUserTasks (projectId: string | null) {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user || !projectId) return

      try {
        const q = query(
          collection(db, 'tasks'),
          where('ownerId', '==', user.uid),
          where('projectId', '==', projectId)
        )
        const snapshot = await getDocs(q)
        const taskList: Task[] = snapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            dueDate: data.dueDate?.toDate?.(),
            projectId: data.projectId,
            createdAt: data.createdAt?.toDate?.(),
            updatedAt: data.updatedAt?.toDate?.(),
            ownerId: data.ownerId
          }
        })

        setTasks(taskList)
        setError(false)
      } catch (err) {
        console.error('Error fetching tasks:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [user, projectId])

  const addTask = async (
    task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'ownerId'>
  ) => {
    if (!user) return

    const now = new Date()

    const docRef = await addDoc(collection(db, 'tasks'), {
      ...task,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ownerId: user.uid
    })

    setTasks(prev => [
      ...prev,
      {
        id: docRef.id,
        ...task,
        createdAt: Timestamp.fromDate(new Date()), // local fallback
        updatedAt: Timestamp.fromDate(new Date()),
        ownerId: user.uid
      }
    ])
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const ref = doc(db, 'tasks', id)
      await updateDoc(ref, {
        ...updates,
        updatedAt: serverTimestamp()
      })

      setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)))
    } catch (err) {
      console.error('Error updating task:', err)
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id))
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      console.error('Error deleting task:', err)
    }
  }

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask
  }
}
