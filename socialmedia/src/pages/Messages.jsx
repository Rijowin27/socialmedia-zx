import { useState } from 'react'
import { useMessage } from '../context/MessageContext'
import { useUser } from '../context/UserContext'
import { Link } from 'react-router-dom'

const Messages = () => {
  const { getConversations, getConversation, sendMessage, markConversationAsRead, formatMessageDate } = useMessage()
  const { getUserById, users, currentUser } = useUser()
  
  const [activeConversation, setActiveConversation] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [showNewMessageModal, setShowNewMessageModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  
  const conversations = getConversations()
  const currentConversation = activeConversation ? getConversation(activeConversation) : null
  
  const handleConversationClick = (conversationId) => {
    setActiveConversation(conversationId)
    markConversationAsRead(conversationId)
  }
  
  const handleSendMessage = (e) => {
    e.preventDefault()
    
    if (newMessage.trim() && activeConversation) {
      sendMessage(activeConversation, newMessage)
      setNewMessage('')
    }
  }
  
  const getOtherParticipant = (conversation) => {
    const otherUserId = conversation.participants.find(id => id !== currentUser.id)
    return getUserById(otherUserId)
  }
  
  const getLastMessage = (conversation) => {
    if (conversation.messages.length === 0) return null
    return conversation.messages[conversation.messages.length - 1]
  }
  
  const hasUnreadMessages = (conversation) => {
    return conversation.messages.some(message => 
      message.senderId !== currentUser.id && !message.read
    )
  }
  
  const handleStartNewConversation = () => {
    setShowNewMessageModal(true)
  }
  
  const availableUsers = users.filter(user => 
    user.id !== currentUser.id && 
    !conversations.some(conv => conv.participants.includes(user.id))
  )
  
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '20px' }}>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="flex" style={{ height: '600px' }}>
          {/* Conversations List */}
          <div style={{ width: '300px', borderRight: '1px solid #e4e6eb', height: '100%', overflow: 'auto' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #e4e6eb' }}>
              <h2>Messages</h2>
              <button 
                style={{ width: '100%', marginTop: '10px' }}
                onClick={handleStartNewConversation}
              >
                New Message
              </button>
            </div>
            
            <div>
              {conversations.length === 0 ? (
                <p className="text-gray" style={{ padding: '16px' }}>No conversations yet.</p>
              ) : (
                conversations.map(conversation => {
                  const otherUser = getOtherParticipant(conversation)
                  const lastMessage = getLastMessage(conversation)
                  const isUnread = hasUnreadMessages(conversation)
                  
                  return (
                    <div 
                      key={conversation.id}
                      className="flex align-center gap-10"
                      style={{ 
                        padding: '12px 16px',
                        borderBottom: '1px solid #e4e6eb',
                        backgroundColor: activeConversation === conversation.id ? '#f0f2f5' : 
                                        isUnread ? '#e7f3ff' : 'white',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleConversationClick(conversation.id)}
                    >
                      <img 
                        src={otherUser.avatar} 
                        alt={otherUser.name} 
                        className="avatar" 
                      />
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div className="flex justify-between">
                          <span className={isUnread ? 'text-bold' : ''}>{otherUser.name}</span>
                          {lastMessage && (
                            <span className="text-gray text-sm">
                              {new Date(lastMessage.timestamp).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        {lastMessage && (
                          <p 
                            className={`text-sm ${isUnread ? 'text-bold' : 'text-gray'}`}
                            style={{ 
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {lastMessage.senderId === currentUser.id ? 'You: ' : ''}
                            {lastMessage.content}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
          
          {/* Conversation Detail */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
            {activeConversation && currentConversation ? (
              <>
                <div style={{ padding: '16px', borderBottom: '1px solid #e4e6eb' }}>
                  <div className="flex align-center gap-10">
                    <img 
                      src={getOtherParticipant(currentConversation).avatar} 
                      alt={getOtherParticipant(currentConversation).name} 
                      className="avatar" 
                    />
                    <h3>{getOtherParticipant(currentConversation).name}</h3>
                  </div>
                </div>
                
                <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                  <div className="flex flex-column gap-10">
                    {currentConversation.messages.map(message => {
                      const isCurrentUser = message.senderId === currentUser.id
                      const user = getUserById(message.senderId)
                      
                      return (
                        <div 
                          key={message.id}
                          className="flex"
                          style={{ 
                            justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                          }}
                        >
                          <div 
                            style={{ 
                              maxWidth: '70%',
                              padding: '8px 12px',
                              borderRadius: '18px',
                              backgroundColor: isCurrentUser ? '#1877f2' : '#f0f2f5',
                              color: isCurrentUser ? 'white' : 'inherit'
                            }}
                          >
                            <p>{message.content}</p>
                            <p 
                              className="text-sm" 
                              style={{ 
                                color: isCurrentUser ? 'rgba(255, 255, 255, 0.7)' : '#65676b',
                                textAlign: 'right'
                              }}
                            >
                              {formatMessageDate(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                
                <div style={{ padding: '16px', borderTop: '1px solid #e4e6eb' }}>
                  <form onSubmit={handleSendMessage} className="flex gap-10">
                    <input
                      type="text"
                      className="input"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      style={{ flex: 1 }}
                    />
                    <button type="submit" disabled={!newMessage.trim()}>
                      Send
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-column align-center justify-center" style={{ height: '100%' }}>
                <p className="text-gray">Select a conversation or start a new one</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* New Message Modal */}
      {showNewMessageModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div className="card" style={{ width: '400px', maxWidth: '90%' }}>
            <h2 className="mb-10">New Message</h2>
            
            {availableUsers.length === 0 ? (
              <p className="text-gray">No users available to message.</p>
            ) : (
              <div className="flex flex-column gap-10 mb-20">
                {availableUsers.map(user => (
                  <div 
                    key={user.id}
                    className="flex align-center gap-10"
                    style={{ 
                      padding: '8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      backgroundColor: selectedUser === user.id ? '#f0f2f5' : 'transparent'
                    }}
                    onClick={() => setSelectedUser(user.id)}
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="avatar" 
                    />
                    <span>{user.name}</span>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex gap-10">
              <button 
                className="btn-secondary"
                style={{ flex: 1 }}
                onClick={() => setShowNewMessageModal(false)}
              >
                Cancel
              </button>
              <button 
                style={{ flex: 1 }}
                disabled={!selectedUser}
                onClick={() => {
                  if (selectedUser) {
                    // Logic to start a new conversation would go here
                    setShowNewMessageModal(false)
                  }
                }}
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Messages