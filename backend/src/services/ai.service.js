const { GoogleGenAI } = require('@google/genai')
const { z } = require('zod')
const { zodToJsonSchema } = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})



const interviewReportSchema = z.object({

    matchScore: z.number(),

    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum(["low", "medium", "high"])
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string())
        })
    ),

    title: z.string().describe("The title of the job for which the interview report is generated"),

})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    try {
        const prompt = `
                You are a senior technical interviewer.

                Generate an interview report.

                Return ONLY valid JSON.

                Do NOT include:
                - explanations
                - text before JSON
                - text after JSON

                Return JSON exactly in this format:

                {
                "title": "string (job title)",
                "matchScore": number,
                "technicalQuestions": [{ "question": "", "intention": "", "answer": "" }],
                "behavioralQuestions": [{ "question": "", "intention": "", "answer": "" }],
                "skillGaps": [{ "skill": "", "severity": "low | medium | high" }],
                "preparationPlan": [{ "day": number, "focus": "", "tasks": [] }]
                }

                IMPORTANT:
                - "title" must be extracted from the job description.

                Resume:
                ${resume}

                Self Description:
                ${selfDescription}

                Job Description:
                ${jobDescription}
                `;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                temperature: 0.2,
                responseMimeType: "application/json",
                responseSchema: {
                    type: "object",
                    ...zodToJsonSchema(interviewReportSchema)
                }
            }
        });


        const jsonMatch = response.text.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("No JSON found in Gemini response");
        }

        const report = interviewReportSchema.parse(
            JSON.parse(jsonMatch[0])
        );
        return report;

    } catch (error) {
        console.error("Interview report generation failed:", error.message);
        throw error;
    }
}

    

module.exports = {
   
    generateInterviewReport
}
