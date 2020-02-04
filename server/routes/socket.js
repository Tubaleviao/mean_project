const { saveLocation } = require('../controllers/users')

const code = socket => {
    console.log('user connected');
    socket.on('new-message', message => {
        console.log(message);
        // { lng: -91.9590777, lat: 41.013430500000005 }
        socket.emit('new-message', message)
        saveLocation(...message)
    });
}

module.exports = {code}