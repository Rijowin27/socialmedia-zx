import { createContext, useState, useContext } from 'react'
import { format } from 'date-fns'

const NotificationContext = createContext()

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      userId: '2',
      type: 'like',
      content: 'Jane Smith liked your post',
      read: false,
      timestamp: '2023-05-15T14:30:00Z',
      relatedId: '3' // Post ID
    },
    {
      id: '2',
      userId: '3',
      type: 'comment',
      content: 'Robert Johnson commented on your post',
      read: true,
      timestamp: '2023-05-14T19:20:00Z',
      relatedId: '3' // Post ID
    },
    {
      id: '3',
      userId: '2',
      type: 'follow',
      content: 'Jane Smith started following you',
      read: false,
      timestamp: '2023-05-13T10:15:00Z',
      relatedId: '2' // User ID
    }
  ])

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      read: false,
      timestamp: new Date().toISOString(),
      ...notification
    }
    setNotifications([newNotification, ...notifications])
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })))
  }

  const getUnreadCount = () => {
    return notifications.filter(notification => !notification.read).length
  }

  const formatNotificationDate = (dateString) => {
    return format(new Date(dateString), 'MMM d, yyyy • h:mm a')
  }

  const value = {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    getUnreadCount,
    formatNotificationDate
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}