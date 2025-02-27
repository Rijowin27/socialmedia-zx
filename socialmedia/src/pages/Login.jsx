import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const Login = () => {
  const [activeTab, setActiveTab] = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('https://randomuser.me/api/portraits/lego/1.jpg')
  const [bio, setBio] = useState('')
  const [error, setError] = useState('')
  
  const { login, register, isAuthenticated } = useUser()
  const navigate = useNavigate()
  
  if (isAuthenticated) {
    navigate('/')
  }
  
  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    
    if (!username || !password) {
      setError('Please fill in all fields')
      return
    }
    
    const success = login(username, password)
    if (success) {
      navigate('/')
    } else {
      setError('Invalid username or password')
    }
  }
  
  const handleRegister = (e) => {
    e.preventDefault()
    setError('')
    
    if (!username || !password || !name) {
      setError('Please fill in all required fields')
      return
    }
    
    const success = register({
      name,
      username,
      avatar: avatar || 'https://randomuser.me/api/portraits/lego/1.jpg',
      bio: bio || 'New user'
    })
    
    if (success) {
      navigate('/')
    } else {
      setError('Username already exists')
    }
  }
  
  return (
    <div className="flex justify-center align-center" style={{ minHeight: '100vh' }}>
      <div style={{ width: '400px', maxWidth: '100%' }}>
        <div className="card">
          <h1 style={{ color: '#1877f2', fontWeight: 'bold', fontSize: '2rem', textAlign: 'center', marginBottom: '20px' }}>
            ZX
          </h1>
          
          <div className="flex mb-20">
            <button 
              className={`btn-secondary ${activeTab === 'login' ? 'active' : ''}`} 
              style={{ 
                flex: 1, 
                borderRadius: '4px 0 0 4px',
                backgroundColor: activeTab === 'login' ? '#e4e6eb' : 'transparent',
                fontWeight: activeTab === 'login' ? 'bold' : 'normal'
              }}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button 
              className={`btn-secondary ${activeTab === 'register' ? 'active' : ''}`} 
              style={{ 
                flex: 1, 
                borderRadius: '0 4px 4px 0',
                backgroundColor: activeTab === 'register' ? '#e4e6eb' : 'transparent',
                fontWeight: activeTab === 'register' ? 'bold' : 'normal'
              }}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>
          
          {error && (
            <div style={{ 
              backgroundColor: '#ffebee', 
              color: '#c62828', 
              padding: '10px', 
              borderRadius: '4px',
              marginBottom: '20px'
            }}>
              {error}
            </div>
          )}
          
          {activeTab === 'login' ? (
            <form onSubmit={handleLogin}>
              <div className="mb-10">
                <label htmlFor="username" className="text-gray">Username</label>
                <input
                  type="text"
                  id="username"
                  className="input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              
              <div className="mb-20">
                <label htmlFor="password" className="text-gray">Password</label>
                <input
                  type="password"
                  id="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <button type="submit" style={{ width: '100%' }}>
                Login
              </button>
              
              <p className="text-gray text-sm mt-10" style={{ textAlign: 'center' }}>
                Logging in easy... Remembering your password is the real Challenge.
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="mb-10">
                <label htmlFor="name" className="text-gray">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="mb-10">
                <label htmlFor="reg-username" className="text-gray">Username *</label>
                <input
                  type="text"
                  id="reg-username"
                  className="input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              
              <div className="mb-10">
                <label htmlFor="reg-password" className="text-gray">Password *</label>
                <input
                  type="password"
                  id="reg-password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div className="mb-10">
                <label htmlFor="avatar" className="text-gray">Avatar URL (optional)</label>
                <input
                  type="text"
                  id="avatar"
                  className="input"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                />
              </div>
              
              <div className="mb-20">
                <label htmlFor="bio" className="text-gray">Bio (optional)</label>
                <textarea
                  id="bio"
                  className="textarea"
                  style={{ minHeight: '80px' }}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              
              <button type="submit" style={{ width: '100%' }}>
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login