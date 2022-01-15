const express = require('express')
const api = require('./api')
const app = express()
const path = require('path')
const publicPath = path.join(__dirname, '..', '..', 'public');
console.log(publicPath)
// const publicPath = '/Users/aseel/elevation/code/elevation-exercises/project/fullstack_jereer_task/public'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})
// app.use(express.static(path.join(__dirname, "..", "..", "public")));

// app.use(express.static('public/build'));
app.use(express.static(publicPath));

app.use('/', api)

app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, "..", "..", "public", 'index.html'));
// });

// server code is runnable on port 3001
const port = process.env.PORT || 3001
app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})