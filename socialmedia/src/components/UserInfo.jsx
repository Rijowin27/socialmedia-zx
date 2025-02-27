import { Link } from 'react-router-dom'

const UserInfo = ({ user, isCurrentUser, postCount }) => {
  return (
    <div className="card">
      <div className="flex flex-column align-center mb-20">
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="avatar avatar-large mb-10" 
        />
        <h1>{user.name}</h1>
        <p className="text-gray">@{user.username}</p>
      </div>
      
      <p className="mb-20">{user.bio}</p>
      
      <div className="flex justify-between mb-20">
        <div className="flex flex-column align-center">
          <span className="text-bold">{user.followers}</span>
          <span className="text-gray">Followers</span>
        </div>
        <div className="flex flex-column align-center">
          <span className="text-bold">{user.following}</span>
          <span className="text-gray">Following</span>
        </div>
        <div className="flex flex-column align-center">
          <span className="text-bold">{postCount}</span>
          <span className="text-gray">Posts</span>
        </div>
      </div>
      
      {!isCurrentUser && (
        <button style={{ width: '100%' }}>Follow</button>
      )}
    </div>
  )
}

export default UserInfo