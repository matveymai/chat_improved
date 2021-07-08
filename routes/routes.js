const { Router } = require('express')
const router = Router()

router.get('/api/', (req,res) => {
    res.json({ test: 42 })
})

module.exports.router = router

