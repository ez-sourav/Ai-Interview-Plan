const {Router} = require('express');
const { registerUserController, loginUserController, logoutUserController, getMeController } = require('../controllers/auth.controller');
const {authUser} = require('../middlewares/auth.middleware')
const authRouter = Router() 

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post('/register',registerUserController)

/**
 * @route POST /api/auth/login
 * @description Login user with email and password
 * @access Public
 */ 
authRouter.post('/login',loginUserController)

/**
 * @route GET /api/auth/logout
 * @description Logout user by clearing the token cookie and adding the token to blacklist
 * @access Public
 */

authRouter.get('/logout',logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @description Get current logged in user details
 * @access Private
 */

authRouter.get('/get-me',authUser,getMeController)

module.exports = authRouter