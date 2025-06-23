const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('./server-config');


cloudinary.config({
  cloud_name:   CLOUDINARY_CLOUD_NAME,
  api_key:      CLOUDINARY_API_KEY,
  api_secret:   CLOUDINARY_API_SECRET,
});


const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'videos',
    resource_type: 'video',    
    format: 'mp4',       
    public_id: (req, file) => `${file.fieldname}-${Date.now()}`
  },
});

const upload = multer({
  storage: videoStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'video/mp4') cb(null, true);
    else cb(new Error('Only MP4 videos allowed'), false);
  },
});

module.exports = { 
    upload,
    cloudinary 
};
