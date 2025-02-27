import { createContext, useState, useContext } from 'react'
import { format } from 'date-fns'
import { useUser } from './UserContext'

const MessageContext = createContext()

export const useMessage = () => useContext(MessageContext)

export const MessageProvider = ({ children }) => {
  const { currentUser } = useUser()
  
  const [conversations, setConversations] = useState([
    {
      id: '1',
      participants: ['1', '2'], // User IDs
      messages: [
        {
          id: '1',
          senderId: '2',
          content: 'Hey, how are you doing?',
          timestamp: '2023-05-15T14:30:00Z',
          read: true
        },
        {
          id: '2',
          senderId: '1',
          content: 'I\'m good! Working on a new project. How about you?',
          timestamp: '2023-05-15T14:35:00Z',
          read: true
        },
        {
          id: '3',
          senderId: '2',
          content: 'Just finished a big client presentation. It went well!',
          timestamp: '2023-05-15T14:40:00Z',
          read: false
        }
      ]
    },
    {
      id: '2',
      participants: ['1', '3'], // User IDs
      messages: [
        {
          id: '4',
          senderId: '3',
          content: 'Did you see the new photography exhibition?',
          timestamp: '2023-05-14T19:20:00Z',
          read: true
        },
        {
          id: '5',
          senderId: '1',
          content: 'Not yet, is it worth checking out?',
          timestamp: '2023-05-14T19:25:00Z',
          read: true
        },
        {
          id: '6',
          senderId: '3',
          content: 'Absolutely! Some amazing landscape photography there.',
          timestamp: '2023-05-14T19:30:00Z',
          read: false
        }
      ]
    }
  ])

  const getConversations = () => {
    return conversations.filter(conversation => 
      conversation.participants.includes(currentUser.id)
    )
  }

  const getConversation = (conversationId) => {
    return conversations.find(conversation => conversation.id === conversationId)
  }

  const getConversationWithUser = (userId) => {
    return conversations.find(conversation => 
      conversation.participants.includes(currentUser.id) && 
      conversation.participants.includes(userId)
    )
  }

  const sendMessage = (conversationId, content) => {
    const newMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      content,
      timestamp: new Date().toISOString(),
      read: false
    }

    setConversations(conversations.map(conversation => {
      if (conversation.id === conversationId) {
        return {
          ...conversation,
          messages: [...conversation.messages, newMessage]
        }
      }
      return conversation
    }))

    return newMessage
  }

  const startNewConversation = (userId, initialMessage) => {
    // Check if conversation already exists
    const existingConversation = getConversationWithUser(userId)
    if (existingConversation) {
      sendMessage(existingConversation.id, initialMessage)
      return existingConversation.id
    }

    // Create new conversation
    const newConversation = {
      id: Date.now().toString(),
      participants: [currentUser.id, userId],
      messages: []
    }

    setConversations([...conversations, newConversation])

    // Send initial message
    if (initialMessage) {
      sendMessage(newConversation.id, initialMessage)
    }

    return newConversation.id
  }

  const markConversationAsRead = (conversationId) => {
    setConversations(conversations.map(conversation => {
      if (conversation.id === conversationId) {
        return {
          ...conversation,
          messages: conversation.messages.map(message => ({
            ...message,
            read: true
          }))
        }
      }
      return conversation
    }))
  }

  const getUnreadCount = () => {
    let count = 0
    conversations.forEach(conversation => {
      if (conversation.participants.includes(currentUser.id)) {
        conversation.messages.forEach(message => {
          if (message.senderId !== currentUser.id && !message.read) {
            count++
          }
        })
      }
    })
    return count
  }

  const formatMessageDate = (dateString) => {
    return format(new Date(dateString), 'MMM d, yyyy • h:mm a')
  }

  const value = {
    getConversations,
    getConversation,
    getConversationWithUser,
    sendMessage,
    startNewConversation,
    markConversationAsRead,
    getUnreadCount,
    formatMessageDate
  }

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
}