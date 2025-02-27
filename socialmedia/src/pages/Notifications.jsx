import { useNotification } from '../context/NotificationContext'
import { useUser } from '../context/UserContext'
import { Link } from 'react-router-dom'

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, formatNotificationDate } = useNotification()
  const { getUserById } = useUser()
  
  const handleMarkAllAsRead = () => {
    markAllAsRead()
  }
  
  const handleNotificationClick = (id) => {
    markAsRead(id)
  }
  
  const getNotificationLink = (notification) => {
    switch (notification.type) {
      case 'like':
      case 'comment':
        return `/post/${notification.relatedId}`
      case 'follow':
        return `/profile/${notification.userId}`
      default:
        return '/'
    }
  }
  
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '20px' }}>
      <div className="card">
        <div className="flex justify-between align-center mb-20">
          <h1>Notifications</h1>
          {notifications.some(n => !n.read) && (
            <button 
              className="btn-secondary"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </button>
          )}
        </div>
        
        {notifications.length === 0 ? (
          <p className="text-gray">No notifications yet.</p>
        ) : (
          <div className="flex flex-column gap-10">
            {notifications.map(notification => {
              const user = getUserById(notification.userId)
              
              return (
                <Link 
                  key={notification.id}
                  to={getNotificationLink(notification)}
                  className="card"
                  style={{ 
                    padding: '12px',
                    margin: '0',
                    textDecoration: 'none',
                    color: 'inherit',
                    backgroundColor: notification.read ? 'white' : '#f0f2f5'
                  }}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="flex gap-10">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="avatar" 
                    />
                    <div>
                      <p>{notification.content}</p>
                      <p className="text-gray text-sm">{formatNotificationDate(notification.timestamp)}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications