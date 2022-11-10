const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const {join} = require('path')

const PORT = process.env.PORT || 8080

app.set('views', join (__dirname , 'views'))
// console.log(join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

io.sockets.on("connection", (socket) => {

    socket.on("username", (username) => {
        socket.username = username;
        io.emit("is_online", `<i> ${socket.username} se ha unido al chat</i>`)
    })

    socket.on("disconnect", (username) => {
        //socket.username = username;
        io.emit("is_online", `<i> ${socket.username} ha abandonado el chat </i>`)
    })

    socket.on("chat_message", (message) => {
        io.emit("is_online", `<strong> ${socket.username} </strong> ${message}`)
    })

})



const server = http.listen(PORT, () => {
    console.log(`Escuchando por el puerto ${server.address().port}`);
})

// module.exports = PORT;

