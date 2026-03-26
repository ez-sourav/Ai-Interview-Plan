const express = require('express');
const {authUser} = require('../middlewares/auth.middleware')
const interviewController = require('../controllers/interviewController')
const upload = require('../middlewares/file.middleware')

const interviewRouter = express.Router();

/**
 * @route POST /api/interview 
 * @description Generate an interview report based on the candidate's resume, self-description, and job description.
 * @access Private
 
 */

interviewRouter.post('/', authUser, upload.single('resume'), interviewController.generateInterviewReportController);


/**
 * @route GET /api/interview/report/:interviewId
 * @description Get the interview report by ID
 */

interviewRouter.get('/report/:interviewId', authUser, interviewController.getInterviewReportByIdController);

/**
 * @route GET /api/interview
 * @description Get all interview reports for the authenticated user
 * @access Private
 */

interviewRouter.get('/', authUser, interviewController.getAllInterviewReportsController);


module.exports = interviewRouter
