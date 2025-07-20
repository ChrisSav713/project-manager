import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './auth/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { SelectedProjectProvider } from './contexts/SelectedProjectContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <SelectedProjectProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SelectedProjectProvider>
    </AuthProvider>
  </StrictMode>
)
