const mongoose = require('mongoose')
const Schema = mongoose.Schema

// user representation in database
const userSchema = new Schema({
    username: String,
    email: String,
    password: { type: String, select: false},
    phone: String,
    countryCode: String,
    pokemonImg: String
})

const UserModel = mongoose.model('user', userSchema)

const saveUser = async function(userObj){
        try{
            const user = new UserModel(userObj)
            const response = await user.save()
            return response
        }catch(e){
            return e.toString()
        }
        
    }

const getUser = async function(userObj){
        try{
            let data = await UserModel.find(userObj, {password: 0})
            return data
        }catch(e){
            return e.toString()
        }
    }

// expose only allowed functions
module.exports = {saveUser,
                    getUser}