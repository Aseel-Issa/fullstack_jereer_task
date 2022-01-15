const mongoose = require('mongoose')
const Schema = mongoose.Schema

// post representation in database
const postSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
     },
    text: String
})

const PostModel = mongoose.model('post', postSchema)

const savePost = async function(postObj){
        try{
            const post = new PostModel(postObj)
            const response = await post.save()
            return response
        }catch(e){
            return e.toString()
        }
        
    }

const getPost = async function(postObj){
        try{
            let data = await PostModel.find(postObj)
            return data
        }catch(e){
            return e.toString()
        }
    }

// returns all posts with its poster's user information too
const getAllPosts = async function(){
        try{
            let data = await PostModel.find({}).populate("user")
            return data
        }catch(e){
            return e.toString()
        }
    }

// expose only allowed functions
module.exports = module.exports = {savePost,
    getAllPosts,
    getPost}