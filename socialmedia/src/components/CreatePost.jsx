import { useState } from 'react'
import { useUser } from '../context/UserContext'
import { usePost } from '../context/PostContext'

const CreatePost = () => {
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const { currentUser } = useUser()
  const { addPost } = usePost()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (content.trim()) {
      addPost({
        userId: currentUser.id,
        content,
        image: imageUrl.trim() || null
      })
      
      setContent('')
      setImageUrl('')
    }
  }
  
  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="flex align-center gap-10 mb-10">
          <img src={currentUser.avatar} alt={currentUser.name} className="avatar" />
          <textarea
            className="textarea"
            placeholder={`${currentUser.name.split(' ')[0]}?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        
        <div className="mb-10">
          <input
            type="text"
            className="input"
            placeholder="Image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={!content.trim()}
          style={{ width: '100%' }}
        >
          Post
        </button>
      </form>
    </div>
  )
}

export default CreatePost