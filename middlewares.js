const colors = require('colors')


module.exports.logger = (req,res,next) => {
    const today = new Date()
    const log = console.log
    const time = `Request ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}:${today.getMilliseconds()}`
    const info = `${req.ip} ${req.protocol} ${req.method} ${req.path}`
    log(colors.bgGreen.black(`Mine  ${time} ${info}`))
    next()
}
