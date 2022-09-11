const UserService = require('../services/user.serivce')
const usersList = require('../db')

class UsersController {
    _userService = null

    constructor(users) {
        this._userService = new UserService(users)
    }

    list = async (req, res) => {
        const user = res.locals?.user
        try {
            const users = this._userService.list(user.role)
            return res.json({ data: users })
        } catch (error) {
            if (error.message === 'forbidden') {
                return res.status(403).json({ error: error.message })
            }
            return res.status(500).json({ error: error.message })
        }
    }

    show = async (req, res) => {
        const id = req.params?.id
        const { id: tokenId, role: tokenRole } = res.locals?.user
        try {
            const user = this._userService.show(id, tokenId, tokenRole)
            return res.json({ data: user })
        } catch (error) {
            this._handleError(error)
        }
    }

    create = async (req, res) => {
        const userData = req.body
        const user = this._userService.create(userData)
        return res.status(201).json({ data: user })
    }

    update = async (req, res) => {
        const id = req.params?.id
        const newUserData = req.body
        const { id: tokenId, role: tokenRole } = res.locals?.user
        try {
            const user = this._userService.update(id, newUserData, tokenId, tokenRole)
            return res.json({ data: user })
        } catch (error) {
            this._handleError(error)
        }
    }

    destroy = async (req, res) => {
        const id = req.params?.id
        const { id: tokenId, role: tokenRole } = res.locals?.user
        try {
            const user = this._userService.destroy(id, tokenId, tokenRole)
            return res.json({ data: user })
        } catch (error) {
            this._handleError(error)
        }
    }

    _handleError = (res, error) => {
        if (error?.message === 'user not found') {
            return res.status(404).json({ error: error.message })
        } else if (error.message === 'forbidden') {
            return res.status(403).json({ error: error.message })
        }
        return res.status(500).json({ error: error.message })
    }
}

module.exports = new UsersController(usersList)
