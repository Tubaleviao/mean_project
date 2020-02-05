const db = require('./db')

const saveLocation = (username, location) => 
    db.findOneAndUpdate({ username }, { $set: { location } });

module.exports = {saveLocation}