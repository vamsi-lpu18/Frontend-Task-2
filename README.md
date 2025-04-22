# 💬 Real-Time Chat Application

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-purple.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Zustand](https://img.shields.io/badge/Zustand-4.5.0-orange.svg?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![Styled Components](https://img.shields.io/badge/Styled%20Components-6.1.0-pink.svg?style=for-the-badge&logo=styled-components)](https://styled-components.com/)

A modern, responsive chat application built with React, featuring real-time messaging, user authentication, and a beautiful UI.

## ✨ Features

- **📱 Real-time Messaging**
  - ⚡ Instant message delivery
  - 📜 Message history
  - 🟢 Online/offline status indicators

- **🔐 User Authentication**
  - 🔒 Secure login system
  - 🔄 Session management
  - 👥 User-specific chat rooms

- **🎨 Modern UI/UX**
  - 🌓 Light/Dark theme support
  - 📱 Responsive design
  - ⏳ Loading skeletons
  - 💬 Toast notifications
  - 📡 Network status indicator

- **🔄 State Management**
  - 📦 Zustand for state management
  - 💾 Persistent storage
  - ⚡ Optimistic updates

## 🛠️ Tech Stack

- **Frontend**
  - ⚛️ React 18
  - 💅 Styled Components
  - 📦 Zustand (State Management)
  - 🔔 React Toastify (Notifications)
  - ⚡ Vite (Build Tool)

- **Mock API**
  - ⏱️ Simulated network delays
  - 💾 In-memory data storage
  - ❌ Error handling

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chat-app.git
cd chat-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
chat-app/
├── src/
│   ├── components/     # React components
│   ├── services/       # API services
│   ├── store/          # State management
│   ├── App.jsx         # Main application
│   └── main.jsx        # Entry point
├── public/             # Static assets
└── package.json        # Project dependencies
```

## 🔌 Mock API

The application uses a mock API service that simulates:
- 🔐 User authentication
- 📥 Message retrieval
- 📤 Message sending
- 📡 Network status checking

### 👥 Mock Users

Default test accounts:
- 👩 Username: `alice`, Password: `password123`
- 👨 Username: `bob`, Password: `password123`
- 👦 Username: `charlie`, Password: `password123`

## 📋 Features in Detail

### 🔐 Authentication
- 🔒 Secure login system
- 💾 Session persistence
- 🔄 Automatic logout on network issues

### 💬 Messaging
- ⚡ Real-time message updates
- 📜 Message history
- 👥 User-specific chat rooms
- ⏰ Message timestamps

### 🎨 UI Features
- 🌓 Light/Dark theme toggle
- 📱 Responsive design
- ⏳ Loading skeletons
- 💬 Toast notifications
- 📡 Network status indicator

### 📦 State Management
- 🔄 Zustand for global state
- 💾 Persistent storage
- ⚡ Optimistic updates
- ❌ Error handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- ⚛️ React Team
- ⚡ Vite Team
- 📦 Zustand Team
- 💅 Styled Components Team

---

<div align="center">
  <sub>Built with ❤️ by Your Name</sub>
</div>
