const { rateLimit } = require('express-rate-limit');


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 10, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
})


module.exports = { limiter };
