const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        default:" "
    },
    email: {
        type: String,
        default:" "
    },
    state: {
        type: String,
        default:" "
    },
    bio: {
       type: String,
       default:" "
    },
    mobilenumber: {
        type: String,
        default:" "
    },
});

module.exports = mongoose.model('usermaster', userSchema, 'usermasters');

