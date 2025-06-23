const express = require('express');
const router = express.Router();
const authRouter = require('./auth-routes');
const videoRouter = require('./video-routes');

router.use('/auth', authRouter);
router.use('/videos', videoRouter);

module.exports = router;
