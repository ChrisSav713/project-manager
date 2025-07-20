import { useState, useEffect } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../auth/AuthContext'

type Task = {
  id?: string
  title: string
  description: string
  status: 'To Do' | 'In Progress' | 'Done'
  dueDate: Date
  priority: 'Low' | 'Medium' | 'High'
  projectId: string
  createdAt?: any
  updatedAt?: any
  ownerId?: string
}

export const useUserTasks = (projectId: string | null) => {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // REAL-TIME FETCH: filtered by projectId
  useEffect(() => {
    if (!user || !projectId) return

    setLoading(true)
    setError(null)

    const q = query(
      collection(db, 'tasks'),
      where('ownerId', '==', user.uid),
      where('projectId', '==', projectId)
    )

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const taskList: Task[] = snapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            title: data.title,
            description: data.description,
            status: data.status,
            dueDate: data.dueDate?.toDate(),
            priority: data.priority,
            projectId: data.projectId,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            ownerId: data.ownerId
          }
        })
        setTasks(taskList)
        setLoading(false)
      },
      err => {
        console.error('Real-time task listener error:', err)
        setError(err as Error)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [user, projectId])

  // ADD
  const addTask = async (
    task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'ownerId'>
  ) => {
    if (!user) return
    setLoading(true)
    setError(null)

    try {
      await addDoc(collection(db, 'tasks'), {
        ...task,
        status: task.status || 'To Do',
        priority: task.priority || 'Medium',
        ownerId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
    } catch (err) {
      console.error('Error adding task:', err)
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  // UPDATE
  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    if (!user) return
    setLoading(true)
    setError(null)

    try {
      const taskRef = doc(db, 'tasks', taskId)
      await updateDoc(taskRef, {
        ...updates,
        updatedAt: serverTimestamp()
      })
    } catch (err) {
      console.error('Error updating task:', err)
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  // DELETE
  const deleteTask = async (taskId: string) => {
    if (!user) return
    setLoading(true)
    setError(null)

    try {
      const taskRef = doc(db, 'tasks', taskId)
      await deleteDoc(taskRef)
    } catch (err) {
      console.error('Error deleting task:', err)
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    loading,
    error
  }
}
