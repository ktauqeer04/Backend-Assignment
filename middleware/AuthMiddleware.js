const { StatusCodes } = require('http-status-codes');
const { ServerConfig } = require('../config/index');
const jwt = require('jsonwebtoken');
const secret = ServerConfig.JWT_SECRET;


const validateUser = async (req, res, next) => {

    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Token not provided" });
    }

    try {

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();

    } catch (error) {

        console.error(error);
        res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });

    }

}


const validateInputs = async (req, res, next) => {

    try {
        
        const { name, email, password } = req.body;

        if(!name){
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Name is not Mentioned"
            })
        }

        if(!email){
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "email is not Mentioned"
            })
        }

        if(!password){
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "password is not Mentioned"
            })
        }

        next();

    } catch (error) {

        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Something Went wrong, Please try again later' });

    }

}


module.exports = {
    validateUser,
    validateInputs
}