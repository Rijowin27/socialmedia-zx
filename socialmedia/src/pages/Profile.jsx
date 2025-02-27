import { useParams } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { usePost } from '../context/PostContext'
import UserInfo from '../components/UserInfo'
import Post from '../components/Post'

const Profile = () => {
  const { id } = useParams()
  const { getUserById, currentUser } = useUser()
  const { getPostsByUserId } = usePost()
  
  const user = getUserById(id)
  const userPosts = getPostsByUserId(id)
  const isCurrentUser = currentUser.id === id
  
  if (!user) {
    return <div>User not found</div>
  }
  
  return (
    <div className="flex gap-20" style={{ paddingTop: '20px' }}>
      <div style={{ width: '350px' }}>
        <UserInfo 
          user={user} 
          isCurrentUser={isCurrentUser} 
          postCount={userPosts.length} 
        />
      </div>
      
      <div style={{ flex: 1 }}>
        <h2 className="mb-20">Posts</h2>
        
        {userPosts.length === 0 ? (
          <div className="card">
            <p className="text-gray">No posts yet.</p>
          </div>
        ) : (
          <div className="flex flex-column gap-20">
            {userPosts.map(post => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile