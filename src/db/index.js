class DB {
    _users = []

    getUsersList() {
        return this._users
    }
}

module.exports = new DB().getUsersList()
