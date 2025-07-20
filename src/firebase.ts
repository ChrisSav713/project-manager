// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD4LotBd_D1cCr8gLNVg6CPdk8TmUZowcw',
  authDomain: 'project-manager-a1bb9.firebaseapp.com',
  projectId: 'project-manager-a1bb9',
  storageBucket: 'project-manager-a1bb9.firebasestorage.app',
  messagingSenderId: '557266224361',
  appId: '1:557266224361:web:a4de0ecac81d2f8b051c78'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
