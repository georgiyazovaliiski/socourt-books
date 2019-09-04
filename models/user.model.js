const mongoose = require('mongoose');
require('mongoose-type-email');
const userSchema = new mongoose.Schema({
        name: {
            type:String,
            required:true,
            unique:true,
            min:6
        },
        email: {
        unique:true,
            type:mongoose.SchemaTypes.Email,
            required:true
        },
        password:{
            type:String,
            required:true,
            max:1024,
            min:6
        },
        reset_password_token: {
            type: String
        },
        reset_password_expires: {
            type: Date
        }
    },
        {
            timestamps:true
        }
)

module.exports = mongoose.model('User', userSchema);