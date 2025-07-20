export interface Project {
  id: string
  name: string
  description?: string
  createdAt?: any // You can replace 'any' with 'Timestamp' if you import it from Firebase
  ownerId: string
}
