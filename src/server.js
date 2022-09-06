const express = require('express')

const routes = require('./routes')

const app = express()

app.use(express.json())

app.use('/api/v1', routes)

app.listen(3000, () => console.log('> server running at http://localhost:3000...'))
