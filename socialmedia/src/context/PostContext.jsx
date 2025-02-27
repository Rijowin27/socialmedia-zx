import { createContext, useState, useContext } from 'react'
import { format } from 'date-fns'

const PostContext = createContext()

export const usePost = () => useContext(PostContext)

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    {
      id: '1',
      userId: '2',
      content: 'Just launched my new website! Check it out and let me know what you think.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
      likes: 24,
      comments: [
        {
          id: '1',
          userId: '1',
          content: 'Looks amazing! Great job!',
          timestamp: '2023-05-15T14:30:00Z'
        },
        {
          id: '2',
          userId: '3',
          content: 'The design is so clean and modern.',
          timestamp: '2023-05-15T15:45:00Z'
        }
      ],
      timestamp: '2023-05-15T12:00:00Z'
    },
    {
      id: '2',
      userId: '3',
      content: 'Beautiful sunset at the beach today. Nature is truly amazing!',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      likes: 56,
      comments: [
        {
          id: '3',
          userId: '2',
          content: 'Wow, what a view! Where is this?',
          timestamp: '2023-05-14T19:20:00Z'
        }
      ],
      timestamp: '2023-05-14T18:30:00Z'
    },
    {
      id: '3',
      userId: '1',
      content: 'Just finished reading this amazing book on artificial intelligence. Highly recommend!',
      image: null,
      likes: 12,
      comments: [],
      timestamp: '2023-05-13T10:15:00Z'
    }
  ])

  const addPost = (newPost) => {
    const postToAdd = {
      id: Date.now().toString(),
      likes: 0,
      comments: [],
      timestamp: new Date().toISOString(),
      ...newPost
    }
    setPosts([postToAdd, ...posts])
  }

  const addComment = (postId, comment) => {
    const commentToAdd = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...comment
    }
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, commentToAdd]
        }
      }
      return post
    }))
  }

  const likePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likes + 1
        }
      }
      return post
    }))
  }

  const getPostsByUserId = (userId) => {
    return posts.filter(post => post.userId === userId)
  }

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM d, yyyy • h:mm a')
  }

  const value = {
    posts,
    addPost,
    addComment,
    likePost,
    getPostsByUserId,
    formatDate
  }

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}