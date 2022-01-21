
export default class User{

    constructor(username, email, password, phone, countryCode){
        // super()
        this.username = username
        this.email = email
        this.password = password
        this.phone = phone
        this.countryCode = countryCode
    }

    // set name(value){ this._name = value }
    set id(id){
        this._id = id
    }



}