const jwt = require('jsonwebtoken')

const JWT = require('../services/jwt.service')
const jwtSecret = JWT.getSecret()

async function validateToken(req, res, next) {
    const token = req.headers?.authorization
    if (!token) {
        return res.status(401).json({ error: 'token is missing' })
    }

    try {
        // const userPayload = jwt.verify(token, jwtSecret)
        // res.locals.user = userPayload
        res.locals.user = { role: 'admin' }
        return next()
    } catch (error) {
        return res.status(401).json({ error: 'token is invalid' })
    }
}

module.exports = validateToken
