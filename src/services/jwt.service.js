const crypto = require('crypto')

class JWT {
    _secret = ''

    constructor() {
        this._secret = crypto.randomUUID()
    }

    getSecret() {
        return this._secret
    }
}

module.exports = new JWT()
