import mongoose from "mongoose"
import connection from "../config/database.mjs"
const UserSchema = new mongoose.Schema({
    usernames: String,
    hash: String,
    salt: String,
    admin: Boolean
})


const User = connection.model('User', UserSchema)

module.exports = User

