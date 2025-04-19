// Mock users data
export const mockUsers = {
  alice: { password: 'password123' },
  bob: { password: 'password123' },
  charlie: { password: 'password123' },
}

// Store messages in memory
let messages = []

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Mock API service
const api = {
  // Login function
  login: async (credentials) => {
    await delay(500) // Simulate network delay
    const user = mockUsers[credentials.username]
    if (user && user.password === credentials.password) {
      return { username: credentials.username }
    }
    throw new Error('Invalid credentials')
  },

  // Get messages for a user
  getMessages: async (username) => {
    await delay(300) // Simulate network delay
    return messages.filter(
      msg => msg.sender === username || msg.receiver === username
    )
  },

  // Send a message
  sendMessage: async (message, username) => {
    await delay(200) // Simulate network delay
    
    // Verify the sender
    if (message.sender !== username) {
      throw new Error('Unauthorized')
    }

    // Create new message with timestamp
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    }

    // Add to messages array
    messages.push(newMessage)

    return newMessage
  },

  // Check network status
  checkNetworkStatus: async () => {
    try {
      // Use a more reliable endpoint and add timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('https://www.google.com/favicon.ico', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache',
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return true;
    } catch (error) {
      // If we get any error (timeout, network error, etc.), we're offline
      console.log('Network status check failed:', error);
      return false;
    }
  }
}

export default api 