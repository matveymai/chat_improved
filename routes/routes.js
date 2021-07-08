const { Router } = require('express')
const controllers = require('../controllers/mainController.js')
const router = Router()

router.get('/api/', controllers.getAllUsers)

module.exports.router = router

