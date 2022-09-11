const authService = require('../services/auth.service')
const usersList = require('../db')

class AuthController {
    login = async (req, res) => {
        const userData = req.body
        try {
            const token = authService.genToken(userData, usersList)
            return res.json({ token })
        } catch (error) {
            if (error.message === 'user not found') {
                return res.status(404).json({ error: error.message })
            }
            return res.status(500).json({ error: error.message })
        }
    }

    logout = async(req, res) => {
        const user = res.locals?.user
        const token = authService.expireToken(user);
        if(!token)
            return res.status(500).json({})
        return res.status(200).json({})
    }
}

module.exports = new AuthController()