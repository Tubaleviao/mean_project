let db 
require('./db').then(db => db = db)

const saveLocation = (username, location) => 
    db.findOneAndUpdate({ username }, { $set: { location } });

module.exports = {saveLocation}