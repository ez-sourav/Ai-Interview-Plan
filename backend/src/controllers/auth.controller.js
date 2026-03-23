const userModel = require('../models/user.model.js')
const blacklistModel = require('../models/blacklist.model.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */

async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide username, email, password"
            })
        }
        // Check if user already exists with the same username or email
        const isUserAlreadyExists = await userModel.findOne({ $or: [{ username }, { email }] })

        if (isUserAlreadyExists) {
            if (isUserAlreadyExists.username === username) {
                return res.status(400).json({
                    message: "Username already taken"
                })
            } if (isUserAlreadyExists.email === email) {
                return res.status(400).json({
                    message: "Account already exists with this email address"
                })
            }
        }

        // Password hash
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        const user = await userModel.create({
            username, email, password: hashedPassword
        })
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" })

        // Set token in httpOnly cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 2 * 24 * 60 * 60 * 1000
        })

        // Return success response
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }


}

/** * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {
    try {
        const { email, password } = req.body
        // Validate request body
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            })
        }
        // Check if user exists with the provided email
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        // Compare provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
        )
        // Set token in httpOnly cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 2 * 24 * 60 * 60 * 1000
        })
        // Return success response
        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

/**
 * 
 * @name logoutUserController
 * @description Logout user by clearing the token cookie and adding the token to blacklist
 * @access Public   
 */

async function logoutUserController(req, res) {
    try {
        const token = req.cookies.token
        if (token) {
            // Add token to blacklist
            await blacklistModel.create({ token })
        }
        // Clear token cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })

        return res.status(200).json({
            message: "User logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

/**
 * @route GET /api/auth/get-me
 * @description Get current logged in user details
 * @access Private
 */
async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}
module.exports = { registerUserController, loginUserController, logoutUserController, getMeController }