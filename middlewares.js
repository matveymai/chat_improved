const colors = require('colors')

module.exports.reqTime = (req,res,next) => {
    req.reqTime = Date.now()
   // req.time = `The time is ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    next()
}

module.exports.logger = (req,res,next) => {
    console.log(colors.bgGreen.black('Logger is working...'))
    next()
}
