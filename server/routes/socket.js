const { saveLocation } = require('../controllers/users')

const code = socket => {
    console.log('user connected');
    socket.on('new-message', function (message){
        console.log(message)
        socket.emit('new-message', message)
        saveLocation({username: message.user, location: message.location})
    });
}

module.exports = {code}