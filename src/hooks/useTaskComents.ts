import { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'
import { db } from '../firebase'
import type { Comment, NewComment } from '../types/types'

export function useTaskComments (taskId: string) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!taskId) return

    const q = query(
      collection(db, `tasks/${taskId}/comments`),
      orderBy('createdAt', 'asc')
    )

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Comment[]
        setComments(list)
        setLoading(false)
      },
      err => {
        console.error('Failed to load comments:', err)
        setError(true)
      }
    )

    return () => unsubscribe()
  }, [taskId])

  // Add new comment
  const addComment = async (newComment: NewComment) => {
    await addDoc(collection(db, `tasks/${taskId}/comments`), newComment)
  }

  // Update existing comment
  const updateComment = async (commentId: string, updatedContent: string) => {
    const commentRef = doc(db, `tasks/${taskId}/comments`, commentId)
    await updateDoc(commentRef, { content: updatedContent })
  }

  // Delete comment
  const deleteComment = async (commentId: string) => {
    const commentRef = doc(db, `tasks/${taskId}/comments`, commentId)
    await deleteDoc(commentRef)
  }

  return {
    comments,
    addComment,
    updateComment,
    deleteComment,
    loading,
    error
  }
}
