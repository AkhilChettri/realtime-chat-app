const express = require("express")
var cors = require('cors')
const app = express()

const http = require("http").Server(app);
const io = require('socket.io')(http)

// app.use(cors())
app.options('*', cors()) 
app.get('/', cors(), (req, res)=>{
    res.render('index.ejs')
})

io.sockets.on('connection', (socket)=>{
    // username
    socket.on('username', (username)=>{
        socket.username = username;
        io.emit('is_online',  '🔵 <i>' + socket.username + ' join the chat..</i>');
    })
    socket.on('disconnect', (username)=>{
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })
    socket.on('chat_message', (message)=>{
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    })
    socket.on('typingMessage', (username)=>{
        io.emit('is_typing', '🔵 <i>' + socket.username + ' is typing ..</i>');
    })
    socket.on('noLongerTypingMessage', (username)=>{
        io.emit('no_typing','🔵 <i>' + socket.username + ' is not typing ..</i>');
    })
})

const server = http.listen(3001, ()=>{
    console.log('listening on *:3001')
})