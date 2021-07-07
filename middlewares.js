const colors = require('colors')
const chalk = require('chalk')
const fs = require('fs')

module.exports.logger = (req,res,next) => {
    const today = new Date()
    const time = `Request ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}:${today.getMilliseconds()}`
    const log = `${req.ip} ${req.protocol} ${req.method} ${req.path}`
    console.log(colors.bgGreen.black(`${time} ${log}`))
    next()
}
