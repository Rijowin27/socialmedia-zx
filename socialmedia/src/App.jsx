import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Messages from './pages/Messages'
import Notifications from './pages/Notifications'
import { UserProvider } from './context/UserContext'
import { PostProvider } from './context/PostContext'
import { NotificationProvider } from './context/NotificationContext'
import { MessageProvider } from './context/MessageContext'
import { useUser } from './context/UserContext'

function App() {
  return (
    <Router>
      <UserProvider>
        <PostProvider>
          <NotificationProvider>
            <MessageProvider>
              <div className="app">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/*" element={<AuthenticatedRoutes />} />
                </Routes>
              </div>
            </MessageProvider>
          </NotificationProvider>
        </PostProvider>
      </UserProvider>
    </Router>
  )
}

const AuthenticatedRoutes = () => {
  const { currentUser, isAuthenticated } = useUser()
  
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }
  
  return (
    <>
    
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </>
  )
}

export default App