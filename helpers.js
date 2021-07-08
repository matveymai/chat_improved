const hbs = require('hbs')

hbs.registerHelper('getTime', (req, res) => {
    const today = new Date()
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    return time
})


module.exports.hbs = hbs