const mongoose = require('mongoose')
// mongoose is a singleton, so connecting to db once is enough

// mongoose.connect('mongodb+srv://admin:mongoPass391@jereer-db.dqjdn.mongodb.net/JEREER-TASK?retryWrites=true&w=majority', { useNewUrlParser: true })
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/JEREER-TASK', { useNewUrlParser: true })
const User = require('./dbModels/User')
const Post = require('./dbModels/Post')


const saveUser = async function(userObj){
        return User.saveUser(userObj)
    }

const getUser = async function(userObj) {
        return User.getUser(userObj)
    }

const savePost = async function(postObj){
        return Post.savePost(postObj)
    }

const getAllPosts = async function(){
        return Post.getAllPosts()
    }
// DbManager is the only module that is responsible of interacting with database
module.exports = {saveUser,
                    savePost,
                    getUser,
                    getAllPosts}