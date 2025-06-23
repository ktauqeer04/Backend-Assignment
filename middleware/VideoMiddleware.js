const { StatusCodes, NOT_FOUND } = require('http-status-codes');
const { ServerConfig } = require('../config/index');
const jwt = require('jsonwebtoken');
const secret = ServerConfig.JWT_SECRET;



const validateVideoInputs = async (req, res, next) => {

    try {
        
        console.log(req);

        const { title, description } = req.body;
        const videoFile = req.file;

        console.log({ title, description, videoFile });


        if (!title) {
            return res.status(StatusCodes.NOT_FOUND).json({ 
                error: 'Title cannot be Empty' 
            });
        }

        if (!description) {
            return res.status(StatusCodes.NOT_FOUND).json({ 
                error: 'description cannot be Empty' 
            });
        }

        if (!videoFile) {
            return res.status(StatusCodes.NOT_FOUND).json({ 
                error: 'videoFile is required' 
            });
        }

        next();

    } catch (error) {

        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Something Went wrong, Please try again later' });

    }

}

module.exports = {
    validateVideoInputs
}