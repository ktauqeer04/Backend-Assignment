const { ServerConfig } = require('../config/index');
const { MONGO_URL } = ServerConfig;
const videoSchema = require('./video');
const userSchema = require('./user');
const mongoose = require('mongoose');

console.log(MONGO_URL);

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const User = mongoose.model('User', userSchema);
const Video = mongoose.model('Video', videoSchema)

module.exports = {
    User,
    Video
}