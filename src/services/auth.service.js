const jwt = require('jsonwebtoken')

const JWT = require('../services/jwt.service')
const jwtSecret = JWT.getSecret()

class AuthService {
    genToken(userData, users) {
        const email = userData?.email
        const password = userData?.password

        const user = users.find(user => user.email == email && user.password == password)
        if (!user) {
            throw new Error('user not found')
        }
        return jwt.sign(user, jwtSecret)
    }

    expireToken(user) {
        return jwt.sign(user, jwtSecret, { expiresIn: (Math.floor(Date.now() / 1000) - 30).toString() })
    }
}

module.exports = new AuthService()
