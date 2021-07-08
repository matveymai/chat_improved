let users = [
    {id: 1, name: 'Neo', status: 'online'},
    {id: 2, name: 'Alice', status: 'online'},
    {id: 3, name: 'Mad Max', status: 'offline'},
    {id: 4, name: 'Sponge Bob', status: 'online'},
    {id: 5, name: 'Jhon Wick', status: 'offline'}
]

const getAllUsers = (req, res) => {
    res.status(200).json(users)
}
module.exports.users = users
module.exports.getAllUsers = getAllUsers