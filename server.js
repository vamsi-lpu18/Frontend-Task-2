const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Enable CORS
app.use(cors());
app.use(express.json());

// Store messages in memory (in a real app, you'd use a database)
const messages = {};

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  // Join a room based on username
  socket.on('join', (username) => {
    socket.join(username);
    console.log(`${username} joined the chat`);
  });

  // Handle new messages
  socket.on('sendMessage', (data) => {
    const { sender, receiver, content } = data;
    const message = {
      id: Date.now().toString(),
      sender,
      receiver,
      content,
      timestamp: new Date()
    };

    // Store the message
    if (!messages[sender]) messages[sender] = [];
    if (!messages[receiver]) messages[receiver] = [];
    messages[sender].push(message);
    messages[receiver].push(message);

    // Send the message to both sender and receiver
    io.to(sender).emit('newMessage', message);
    io.to(receiver).emit('newMessage', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// REST endpoints
app.get('/api/messages/:username', (req, res) => {
  const { username } = req.params;
  res.json(messages[username] || []);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 