const router = require('express').Router()

const authController = require('./controllers/auth.controller')
const usersController = require('./controllers/users.controller')

const authMiddleware = require('./middlewares/auth.middleware')

router.get('/health', (req, res) => res.json({ status: 'UP' }))

router.post('/login', authController.login)

router.post('/logout', [authMiddleware, authController.logout])

router.route('/users')
    .get([authMiddleware, usersController.list])
    .post(usersController.create)

router.route('/users/:id')
    .get([authMiddleware, usersController.show])
    .put([authMiddleware, usersController.update])
    .delete([authMiddleware, usersController.destroy])

module.exports = router
