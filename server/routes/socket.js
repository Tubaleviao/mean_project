const { saveLocation } = require('../controllers/location')

const code = socket => {
    console.log('user connected');
    socket.on('new-message', function (message){
        console.log(message)
        socket.broadcast.emit('new-message', message)
        saveLocation( message.username, message.location)
    });
}

module.exports = {code}