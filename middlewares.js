const colors = require('colors')
const chalk = require('chalk')

module.exports.reqTime = (req,res,next) => {
    const today = new Date()
    const time = `The time is ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    console.log(time)
    next()
}

module.exports.logger = (req,res,next) => {
    console.log(colors.bgGreen.black('Logger is working...'))
    next()
}
