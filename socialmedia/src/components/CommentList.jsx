import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { usePost } from '../context/PostContext'

const CommentList = ({ comments }) => {
  const { getUserById } = useUser()
  const { formatDate } = usePost()
  
  if (comments.length === 0) {
    return <p className="text-gray text-sm">No comments yet. Be the first to comment!</p>
  }
  
  return (
    <div className="flex flex-column gap-10">
      {comments.map(comment => {
        const user = getUserById(comment.userId)
        
        return (
          <div key={comment.id} className="flex gap-10">
            <Link to={`/profile/${user.id}`}>
              <img src={user.avatar} alt={user.name} className="avatar" style={{ width: '32px', height: '32px' }} />
            </Link>
            <div style={{ backgroundColor: '#f0f2f5', padding: '8px 12px', borderRadius: '18px', flex: 1 }}>
              <Link to={`/profile/${user.id}`} className="text-bold">
                {user.name}
              </Link>
              <p>{comment.content}</p>
              <div className="text-gray text-sm">{formatDate(comment.timestamp)}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CommentList