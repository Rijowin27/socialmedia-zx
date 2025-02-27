import { createContext, useState, useContext } from 'react'

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Software developer and tech enthusiast',
    followers: 245,
    following: 120
  })

  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      bio: 'Software developer and tech enthusiast',
      followers: 245,
      following: 120
    },
    {
      id: '2',
      name: 'Jane Smith',
      username: 'janesmith',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      bio: 'Digital marketer and content creator',
      followers: 532,
      following: 250
    },
    {
      id: '3',
      name: 'Robert Johnson',
      username: 'robertj',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      bio: 'Photographer and travel blogger',
      followers: 1024,
      following: 350
    }
  ])

  const getUserById = (id) => {
    return users.find(user => user.id === id) || null
  }

  const login = (username, password) => {
    // In a real app, this would validate against a backend
    const user = users.find(user => user.username === username)
    if (user && password === 'password') { // Simple password check for demo
      setCurrentUser(user)
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  const register = (newUser) => {
    const userExists = users.some(user => user.username === newUser.username)
    if (userExists) {
      return false
    }

    const user = {
      id: Date.now().toString(),
      followers: 0,
      following: 0,
      ...newUser
    }

    setUsers([...users, user])
    setCurrentUser(user)
    setIsAuthenticated(true)
    return true
  }

  const value = {
    currentUser,
    setCurrentUser,
    users,
    getUserById,
    isAuthenticated,
    login,
    logout,
    register
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}