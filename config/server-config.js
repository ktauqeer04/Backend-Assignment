const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.SECRET;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// console.log({
//     PORT,
//     MONGO_URL,
//     JWT_SECRET,
//     CLOUDINARY_CLOUD_NAME,
//     CLOUDINARY_API_KEY,
//     CLOUDINARY_API_SECRET
// })

module.exports = {
    PORT,
    MONGO_URL,
    JWT_SECRET,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
}