const { GoogleGenAI } = require('@google/genai')
const { z } = require('zod')
const { zodToJsonSchema } = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

async function invokeGeminiAi() {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: "Hello GEMINI! Tell me a JavaScript joke."
    })

    console.log(response.text)
}


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
    )

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
 "matchScore": number,
 "technicalQuestions": [{ "question": "", "intention": "", "answer": "" }],
 "behavioralQuestions": [{ "question": "", "intention": "", "answer": "" }],
 "skillGaps": [{ "skill": "", "severity": "low | medium | high" }],
 "preparationPlan": [{ "day": number, "focus": "", "tasks": [] }]
}

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

        console.log("\nInterview Report:\n");
        console.log(JSON.stringify(report, null, 2));

    } catch (error) {
        console.error("Interview report generation failed:", error.message);
    }
}

module.exports = {
    invokeGeminiAi,
    generateInterviewReport
}
