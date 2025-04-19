import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import useStore from './store/useStore'
import api, { mockUsers } from './services/api'
import StatusIndicator from './components/StatusIndicator'
import MessageSkeleton from './components/MessageSkeleton'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${(props) => (props.theme === 'dark' ? '#1a1a1a' : '#f5f5f5')};
  color: ${(props) => (props.theme === 'dark' ? '#fff' : '#333')};
  min-height: 100vh;
  transition: background-color 0.3s ease;
`

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  background-color: ${(props) => (props.theme === 'dark' ? '#2d2d2d' : '#fff')};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 24px;
  transition: all 0.3s ease;
`

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: ${(props) => (props.theme === 'dark' ? '#333' : '#f8f9fa')};
  border-radius: 12px;
  margin: 20px 0;
  scrollbar-width: thin;
  scrollbar-color: ${(props) => (props.theme === 'dark' ? '#555' : '#ccc')} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => (props.theme === 'dark' ? '#555' : '#ccc')};
    border-radius: 3px;
  }
`

const Message = styled.div`
  background-color: ${(props) =>
    props.isCurrentUser
      ? props.theme === 'dark'
        ? '#4a90e2'
        : '#007bff'
      : props.theme === 'dark'
      ? '#404040'
      : '#fff'};
  color: ${(props) => (props.isCurrentUser ? '#fff' : 'inherit')};
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  max-width: 70%;
  align-self: ${(props) => (props.isCurrentUser ? 'flex-end' : 'flex-start')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  strong {
    display: block;
    margin-bottom: 4px;
    font-size: 0.9em;
    opacity: 0.8;
  }

  p {
    margin: 8px 0;
    line-height: 1.4;
  }

  small {
    display: block;
    font-size: 0.8em;
    opacity: 0.7;
    text-align: right;
  }
`

const InputContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  background-color: ${(props) => (props.theme === 'dark' ? '#333' : '#f8f9fa')};
  border-radius: 12px;
  margin-top: auto;
`

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid ${(props) => (props.theme === 'dark' ? '#404040' : '#e0e0e0')};
  border-radius: 8px;
  font-size: 16px;
  background-color: ${(props) => (props.theme === 'dark' ? '#2d2d2d' : '#fff')};
  color: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.theme === 'dark' ? '#4a90e2' : '#007bff')};
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const Button = styled.button`
  padding: 12px 24px;
  background-color: ${(props) => (props.theme === 'dark' ? '#4a90e2' : '#007bff')};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.theme === 'dark' ? '#357abd' : '#0056b3')};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 100px auto;
  padding: 32px;
  background-color: ${(props) => (props.theme === 'dark' ? '#2d2d2d' : '#fff')};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease;

  h2 {
    text-align: center;
    margin-bottom: 24px;
    color: ${(props) => (props.theme === 'dark' ? '#fff' : '#333')};
    font-size: 24px;
    font-weight: 600;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  label {
    color: ${(props) => (props.theme === 'dark' ? '#e0e0e0' : '#555')};
    font-size: 14px;
    font-weight: 500;
  }

  input {
    padding: 12px 16px;
    border: 2px solid ${(props) => (props.theme === 'dark' ? '#404040' : '#e0e0e0')};
    border-radius: 8px;
    background-color: ${(props) => (props.theme === 'dark' ? '#333' : '#fff')};
    color: ${(props) => (props.theme === 'dark' ? '#fff' : '#333')};
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: ${(props) => (props.theme === 'dark' ? '#4a90e2' : '#007bff')};
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    &::placeholder {
      color: ${(props) => (props.theme === 'dark' ? '#888' : '#999')};
    }
  }

  button {
    margin-top: 8px;
    padding: 12px 24px;
    background-color: ${(props) => (props.theme === 'dark' ? '#4a90e2' : '#007bff')};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => (props.theme === 'dark' ? '#357abd' : '#0056b3')};
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(1px);
    }
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid ${(props) => (props.theme === 'dark' ? '#404040' : '#e0e0e0')};

  h2 {
    margin: 0;
    color: ${(props) => (props.theme === 'dark' ? '#fff' : '#333')};
  }

  div {
    display: flex;
    gap: 12px;
  }
`

const UserSelect = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  background-color: ${(props) => (props.theme === 'dark' ? '#333' : '#f8f9fa')};
  border-radius: 12px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
  }

  select {
    width: 100%;
    padding: 12px;
    border: 2px solid ${(props) => (props.theme === 'dark' ? '#404040' : '#e0e0e0')};
    border-radius: 8px;
    background-color: ${(props) => (props.theme === 'dark' ? '#2d2d2d' : '#fff')};
    color: inherit;
    font-size: 16px;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: ${(props) => (props.theme === 'dark' ? '#4a90e2' : '#007bff')};
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
  }
`

function App() {
  const {
    messages,
    addMessage,
    setMessages,
    user,
    isAuthenticated,
    login,
    logout,
    theme,
    setTheme,
    isLoading,
    setLoading,
  } = useStore()

  const [newMessage, setNewMessage] = useState('')
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [selectedReceiver, setSelectedReceiver] = useState('')
  const [lastMessageId, setLastMessageId] = useState(null)

  // Function to check for new messages
  const checkForNewMessages = async () => {
    if (!isAuthenticated || !user?.username) return

    try {
      const loadedMessages = await api.getMessages(user.username)
      
      // Find the latest message ID
      const latestMessage = loadedMessages[loadedMessages.length - 1]
      if (latestMessage && latestMessage.id !== lastMessageId) {
        // Merge new messages with existing ones
        const existingMessageIds = new Set(messages.map(msg => msg.id))
        const newMessages = loadedMessages.filter(msg => !existingMessageIds.has(msg.id))
        
        // Add new messages to the store
        newMessages.forEach(msg => addMessage(msg))
        
        // Update last message ID
        setLastMessageId(latestMessage.id)
      }
    } catch (error) {
      console.error('Failed to check for new messages:', error)
    }
  }

  // Load initial messages
  useEffect(() => {
    const loadMessages = async () => {
      if (isAuthenticated && user?.username) {
        setLoading(true)
        try {
          const loadedMessages = await api.getMessages(user.username)
          setMessages(loadedMessages)
          
          // Set the last message ID
          if (loadedMessages.length > 0) {
            setLastMessageId(loadedMessages[loadedMessages.length - 1].id)
          }
        } catch (error) {
          console.error('Failed to load messages:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    loadMessages()
  }, [isAuthenticated, user?.username, setMessages, setLoading])

  // Set up polling for new messages
  useEffect(() => {
    if (!isAuthenticated) return

    // Check for new messages every 3 seconds
    const intervalId = setInterval(checkForNewMessages, 3000)

    // Clean up interval on unmount or when dependencies change
    return () => clearInterval(intervalId)
  }, [isAuthenticated, user?.username, messages, lastMessageId])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !isAuthenticated || !selectedReceiver) return

    const message = {
      content: newMessage,
      sender: user.username,
      receiver: selectedReceiver,
    }

    setNewMessage('')
    setLoading(true)

    try {
      const response = await api.sendMessage(message, user.username)
      addMessage(response)
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    await login(loginData)
  }

  // Get unique list of users to chat with
  const availableUsers = Object.keys(mockUsers).filter(
    (username) => username !== user?.username
  )

  // Filter messages for the selected conversation
  const conversationMessages = messages.filter(
    (message) =>
      (message.sender === user?.username && message.receiver === selectedReceiver) ||
      (message.sender === selectedReceiver && message.receiver === user?.username)
  )

  if (!isAuthenticated) {
    return (
      <AppContainer theme={theme}>
        <LoginContainer theme={theme}>
          <h2>Welcome to Chat App</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">Username</label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
                theme={theme}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                theme={theme}
              />
            </div>
            <Button type="submit" theme={theme}>Login</Button>
          </form>
        </LoginContainer>
        <StatusIndicator />
      </AppContainer>
    )
  }

  return (
    <AppContainer theme={theme}>
      <ChatContainer theme={theme}>
        <Header theme={theme}>
          <h2>Chat App - {user?.username}</h2>
          <div>
            <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              Toggle Theme
            </Button>
            <Button onClick={logout} style={{ marginLeft: '10px' }}>
              Logout
            </Button>
          </div>
        </Header>
        
        <UserSelect theme={theme}>
          <label htmlFor="receiver">Select user to chat with</label>
          <select
            id="receiver"
            value={selectedReceiver}
            onChange={(e) => setSelectedReceiver(e.target.value)}
          >
            <option value="">Select a user</option>
            {availableUsers.map((username) => (
              <option key={username} value={username}>
                {username}
              </option>
            ))}
          </select>
        </UserSelect>

        <MessagesContainer theme={theme}>
          {isLoading ? (
            <MessageSkeleton />
          ) : (
            conversationMessages.map((message) => (
              <Message
                key={message.id}
                isCurrentUser={message.sender === user.username}
                theme={theme}
              >
                <div>
                  <strong>{message.sender}</strong>
                  <p>{message.content}</p>
                  <small>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </small>
                </div>
              </Message>
            ))
          )}
        </MessagesContainer>
        <InputContainer theme={theme}>
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Type a message to ${selectedReceiver || 'select a user'}...`}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={!selectedReceiver}
            theme={theme}
          />
          <Button onClick={handleSendMessage} disabled={!selectedReceiver} theme={theme}>
            Send
          </Button>
        </InputContainer>
      </ChatContainer>
      <StatusIndicator />
    </AppContainer>
  )
}

export default App
