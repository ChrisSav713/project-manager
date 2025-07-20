import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'
import Navbar from './pages/navbar'
import Dashboard from './pages/dashboard'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Welcome from './components/welcome'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import NewProject from './pages/newProject'
import EditProjectForm from './pages/editProjectForm'

function App () {
  const { user } = useAuth()
  return (
    <>
      <Navbar />
      <div className='pt-16'>
        <Routes>
          <Route
            path='/'
            element={user ? <Navigate to='/dashboard' /> : <Welcome />}
          />
          <Route
            path='/login'
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path='/signup'
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path='/newproject'
            element={
              <PrivateRoute>
                <NewProject />
              </PrivateRoute>
            }
          />
          <Route
            path='/edit/:id'
            element={
              <PrivateRoute>
                <EditProjectForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  )
}

export default App
