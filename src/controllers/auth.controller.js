const authService = require('../services/auth.service')

class AuthController {
    async login(req, res) {
        const userData = req.body
        try {
            const token = authService.genToken(userData)
            return res.json({ token })
        } catch (error) {
            if (error.message === 'user not found') {
                return res.status(404).json({ error: error.message })
            }
            return res.status(500).json({ error: error.message })
        }
    }

    async logout(req, res) {
        const user = res.locals?.user
        return authService.expireToken(user)
    }
}

module.exports = new AuthController()