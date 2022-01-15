const express = require('express')
const router = express.Router()
const db = require('./DbManager')

// a sanity check to make sure the server works
router.get('/sanity', function (request, response) {
    console.log("Ok!")
    response.send('Ok!')
})


// Text Post - a GET route that returns all of the posts from DB
router.get('/TextPost', async function (request, response) {
    const results = await db.getAllPosts()
    response.send(results)
})

// /User - a POST route that saves a user into the DB
router.post('/User', async function (request, response) {
    const user = request.body
    const result = await db.saveUser(user)
    response.send(result)
})

// /User - a GET route that finds a user in database by filtering on email
router.get('/User/:email', async function (request, response) {
    const results = await db.getUser({email: request.params.email})
    response.send(results)
})

//TextPost - a POST route that saves a post into the DB
router.post('/TextPost', async function (request, response) {
    const post = request.body
    const result = await db.savePost(post)
    response.send(result)
})

module.exports = router;