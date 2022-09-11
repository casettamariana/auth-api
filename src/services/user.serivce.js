const crypto = require('crypto')

class UserService {
    _users = []

    constructor(users) {
        this._users = users
    }

    list = (role) => {
        if (role !== 'admin') {
            throw new Error('forbidden')
        }
        return this._users
    }

    create = (userData) => {
        const id = crypto.randomUUID()
        const user = { id, ...userData }
        this._users.push(user)
        return user
    }

    show = (id, tokenId, tokenRole) => {
        const user = this._users.find(user => user.id === id)
        this._userExists(user)
        this._checkUser(user.id, tokenId, tokenRole)
        return user
    }

    destroy = (id, tokenId, tokenRole) => {
        const user = this._users.find(user => user.id === id)
        this._userExists(user)
        this._checkUser(user.id, tokenId, tokenRole)
        this._users = this._users.filter(user => user.id !== id)
    }

    update = (id, newUserData, tokenId, tokenRole) => {
        let user = this._users.find(user => user.id === id)
        this._userExists(user)
        this._checkUser(user.id, tokenId, tokenRole)
        user = { id, ...newUserData }
        this._users = this._users.filter(user => user.id !== id)
        this._users.push(user)
    }

    _userExists = (user) => {
        if (!user) {
            throw new Error('user not found')
        }
    }

    _checkUser = (userId, tokenId, tokenRole) => {
        if (userId !== tokenId && tokenRole !== 'admin') {
            throw new Error('forbidden')
        }
    }

    _checkRole = (email, password) => {
        const user = this._users.find(user => 
            user.email === email && user.password === password
        )
        return user.role;
    }
}

module.exports = UserService
