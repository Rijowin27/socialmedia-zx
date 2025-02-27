import { usePost } from '../context/PostContext'
import Post from '../components/Post'
import CreatePost from '../components/CreatePost'

const Home = () => {
  const { posts } = usePost()
  
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '20px' }}>
      <CreatePost />
      
      <div className="flex flex-column gap-20">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Home