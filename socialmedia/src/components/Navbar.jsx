import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { useNotification } from '../context/NotificationContext'
import { useMessage } from '../context/MessageContext'

const Navbar = () => {
  const { currentUser, logout } = useUser()
  const { getUnreadCount: getUnreadNotifications } = useNotification()
  const { getUnreadCount: getUnreadMessages } = useMessage()

  const unreadNotifications = getUnreadNotifications()
  const unreadMessages = getUnreadMessages()

  return (
    <nav className="card" style={{ marginBottom: '20px', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container flex align-center justify-between">
        <Link to="/" style={{ color: '#1877f2', fontWeight: 'bold', fontSize: '1.5rem' }}>
          ZX
        </Link>
        
        <div className="flex align-center gap-20">
          <Link to="/">Home</Link>
          
          <Link to="/notifications" className="flex align-center gap-5" style={{ position: 'relative' }}>
            Notifications
            {unreadNotifications > 0 && (
              <span className="badge" style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#e41e3f',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {unreadNotifications}
              </span>
            )}
          </Link>
          
          <Link to="/messages" className="flex align-center gap-5" style={{ position: 'relative' }}>
            Messages
            {unreadMessages > 0 && (
              <span className="badge" style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#e41e3f',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {unreadMessages}
              </span>
            )}
          </Link>
          
          <Link to={`/profile/${currentUser.id}`} className="flex align-center gap-10">
            <img src={currentUser.avatar} alt={currentUser.name} className="avatar" style={{ width: '32px', height: '32px' }} />
            <span>{currentUser.name}</span>
          </Link>
          
          <button 
            onClick={logout} 
            className="btn-secondary"
            style={{ padding: '6px 12px' }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar