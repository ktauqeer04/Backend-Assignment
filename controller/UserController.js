const { StatusCodes } = require('http-status-codes');
const { User } = require('../db/index');
const { ServerConfig } = require('../config/index');
const { JWT_SECRET } = ServerConfig;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const login = async (req, res) => {

    try {
        
        const { email, password } = req.body;
        console.log(password);
        const user = await User.findOne({ email });
        console.log(user);
        
        if(!user){
            return res.status(StatusCodes.NOT_FOUND).json({
                error: "Authentication Failed, Email not Found"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect Password' });
        }
        

        const Randomtoken = jwt.sign(user.toJSON(), JWT_SECRET, {
            expiresIn: '5h'
        });

        const completeToken = "Bearer " + Randomtoken;

        return res.status(StatusCodes.OK).json({ 
            message: "Login Successfull",
            token: completeToken 
        });


    } catch (error) {

        console.error(error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        });
    }

}

const signup = async (req, res) => {

    try {
        
        const { name, email, password } = req.body;
        const hashedPass = await bcrypt.hash(password, 10);
        const user = new User({ name, email, passwordHash: hashedPass});
        await user.save();


        const Randomtoken = jwt.sign(user.toJSON(), JWT_SECRET, {
            expiresIn: '5h'
        });

        const completeToken = "Bearer " + Randomtoken;

        return res.status(StatusCodes.OK).json({
            message: "Sign Up Successfull",
            token: completeToken
        });

    } catch (error) {

        if(error.errorResponse.code === 11000){
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Cannot signup using an email which is already associated with an account"
            });
        }

        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        });
        
    }

}


const UserProfile = async (req, res) => {

    try {
        
        const email = req.user.email;
        const user = await User.findOne({ email });

        return res.status(StatusCodes.OK).json({
            name: user.name,
            email: email
        });

    } catch (error) {

        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        });
        
    }

}

module.exports = {
    login, 
    signup,
    UserProfile
}