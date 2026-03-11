const { GoogleGenAI } = require('@google/genai')
const { z } = require('zod');
const { zodToJsonSchema }=  require("zod-to-json-schema");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

async function invokeGeminiAi() {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: "Hello, GEMINI! Can you tell me a joke about JavaScript?"
    })
    console.log(response.text);
}

const interviewReportSchema = z.object({
    matchScore: z.number().describe("The overall match score between the candidate and the job description, on a scale of 0 to 100"),

    technicalQuestions: z.array(z.string({
        question: z.string().describe("The technical question asked during the interview"),
        intention: z.string().describe("The intention behind the question, e.g. to test problem-solving skills, to assess knowledge of a specific technology, etc."),
        answer: z.string().describe("How the candidate answered the question, what points they covered, what approaches to took, etc."),
    })).describe("Technical questions asked during the interview, along with the candidate's answers and the intention behind each question"),
    behavioralQuestions: z.array(z.string({
        question: z.string().describe("The technical question asked during the interview"),
        intention: z.string().describe("The intention behind the question, e.g. to test problem-solving skills, to assess knowledge of a specific technology, etc."),
        answer: z.string().describe("How the candidate answered the question, what points they covered, what approaches to took, etc."),
    })).describe("Behavioral questions asked during the interview, along with the candidate's answers and the intention behind each question"),
    skillGaps: z.array(z.string()).describe("Any skill gaps identified during the interview, along with suggestions for improvement"),
    severity: z.enum(['low', 'medium', 'high']).describe("The severity of the skill gap, e.g. low, medium, high").describe("The severity of the skill gap, e.g. low, medium, high"),
    praparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, e.g. 1, 2, 3, etc."),
        focus: z.string().describe("The focus area for that day, e.g. data structures, system design, etc."),
        tasks: z.array(z.string()).describe("The specific tasks or exercises to be completed on that day, e.g. solve 5 coding problems, read a chapter on system design, etc.")
    })).describe("A detailed preparation plan for the candidate, outlining what they should focus on each day leading up to the interview, along with specific tasks or exercises to complete")
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate a detailed interview report for a candidate based on the details: 
                        Resume: ${resume}, 
                        Self Description: ${selfDescription}, 
                        Job Description: ${jobDescription}.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        },
    })

    console.log(response.text);
}

module.exports = {
    invokeGeminiAi,
    generateInterviewReport
}