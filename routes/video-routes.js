const express = require('express');
const router = express.Router();
const { CloudinaryConfig } = require('../config/index');
const { upload } = CloudinaryConfig;
const { VideoController } = require('../controller/index');
const { AuthMiddleware } = require('../middleware/index');

router.get('/homepage', VideoController.getVideos);
router.post('/uploads', AuthMiddleware.validateUser, upload.single('video'), VideoController.postVideo);

module.exports = router;