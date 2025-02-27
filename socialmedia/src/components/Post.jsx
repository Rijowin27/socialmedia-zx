import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { usePost } from '../context/PostContext'
import CommentList from './CommentList'

const Post = ({ post }) => {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const { getUserById, currentUser } = useUser()
  const { likePost, addComment, formatDate } = usePost()
  
  const user = getUserById(post.userId)
  
  const handleAddComment = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      addComment(post.id, {
        userId: currentUser.id,
        content: newComment
      })
      setNewComment('')
    }
  }
  
  return (
    <div className="card">
      <div className="flex align-center gap-10 mb-10">
        <Link to={`/profile/${user.id}`}>
          <img src={user.avatar} alt={user.name} className="avatar" />
        </Link>
        <div>
          <Link to={`/profile/${user.id}`} className="text-bold">
            {user.name}
          </Link>
          <div className="text-gray text-sm">{formatDate(post.timestamp)}</div>
        </div>
      </div>
      
      <p className="mb-10">{post.content}</p>
      
      {post.image && (
        <img 
          src={post.image} 
          alt="Post" 
          style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} 
        />
      )}
      
      <div className="flex gap-10 mb-10">
        <div className="text-gray">{post.likes} likes</div>
        <div className="text-gray">{post.comments.length} comments</div>
      </div>
      
      <div className="divider"></div>
      
      <div className="flex mt-10 mb-10">
        <button 
          className="btn-secondary" 
          style={{ flex: 1, marginRight: '8px' }}
          onClick={() => likePost(post.id)}
        >
          Like
        </button>
        <button 
          className="btn-secondary" 
          style={{ flex: 1 }}
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </button>
      </div>
      
      {showComments && (
        <>
          <div className="divider"></div>
          
          <CommentList comments={post.comments} />
          
          <form onSubmit={handleAddComment} className="flex align-center gap-10 mt-10">
            <img src={currentUser.avatar} alt={currentUser.name} className="avatar" style={{ width: '32px', height: '32px' }} />
            <input
              type="text"
              className="input"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>
        </>
      )}
    </div>
  )
}

export default Post