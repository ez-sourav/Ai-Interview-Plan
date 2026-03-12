const express = require('express');
const {authUser} = require('../middlewares/auth.middleware')
const interviewController = require('../controllers/interviewController')

const interviewRouter = express.Router();

/**
 * @route POST /api/interview 
 * @description Generate an interview report based on the candidate's resume, self-description, and job description.
 * @access Private
 
 */

interviewRouter.post('/', authUser, interviewController.generateInterviewReportController);


module.exports = interviewRouter
