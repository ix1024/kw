const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const user = new mongoose.Schema({
    id: ObjectId,
    userName: {
        type: String,
        default: ''
    },
    nickname: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    qq: {
        type: String,
        default: ''
    },
    sex: {
        type: Number,
        default: 0
    },
    tel: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    //头像
    avatarUrl: {
        type: String,
        default: ''
    },
    //创建时间
    createDate: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('user', user);