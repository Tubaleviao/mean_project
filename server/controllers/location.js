let db 
require('./db').then(db => db = db).catch(e=> console.log(e))

const saveLocation = (username, location) => 
    db.findOneAndUpdate({ username }, { $set: { location } });

module.exports = {saveLocation}