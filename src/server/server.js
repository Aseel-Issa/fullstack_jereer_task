const express = require('express')
const api = require('./api')
const app = express()
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

app.use(express.static('build'));

app.use('/', api)

// server code is runnable on port 3001
const port = process.env.PORT || 3001
app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})