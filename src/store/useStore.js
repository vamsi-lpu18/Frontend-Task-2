import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      // Chat history state
      messages: [],
      // User session data
      user: null,
      isAuthenticated: false,
      // UI preferences
      theme: 'light',
      fontSize: 16,
      notifications: true,
      // Loading and error states
      isLoading: false,
      error: null,
      // Network status
      isOnline: true,

      // Actions
      addMessage: (message) =>
        set((state) => {
          // Check if message already exists
          const messageExists = state.messages.some((m) => m.id === message.id)
          if (messageExists) {
            return state
          }
          return {
            messages: [
              ...state.messages,
              {
                ...message,
                id: message.id || Math.random().toString(36).substr(2, 9),
                timestamp: message.timestamp || new Date(),
              },
            ],
          }
        }),

      setMessages: (newMessages) => set({ messages: newMessages }),

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setTheme: (theme) => set({ theme }),

      setFontSize: (fontSize) => set({ fontSize }),

      setNotifications: (notifications) => set({ notifications }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      setOnlineStatus: (isOnline) => set({ isOnline }),

      // Mock API calls
      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))
          set({
            user: { id: 1, username: credentials.username },
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({ error: 'Login failed', isLoading: false })
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'chat-app-storage',
      partialize: (state) => ({
        messages: state.messages,
        theme: state.theme,
        fontSize: state.fontSize,
        notifications: state.notifications,
      }),
    }
  )
)

export default useStore 