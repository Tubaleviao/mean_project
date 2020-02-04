const getUsers = async db => {
    return await db.find({})
    .project({ "_id": 0, "username": 1 }).toArray();
}

module.exports = {getUsers}