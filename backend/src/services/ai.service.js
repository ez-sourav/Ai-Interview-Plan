const { GoogleGenAI } = require('@google/genai')
const { z } = require('zod')
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require('puppeteer')

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
            model: "gemini-3-flash-preview",
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

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    try {
        const resumePdfSchema = z.object({
            html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
        })

        const prompt = `
You are an expert resume writer and ATS optimization system.

INPUT:
- Resume: ${resume}
- Self Description: ${selfDescription}
- Job Description: ${jobDescription}

TASK:
Generate a highly optimized, ATS-friendly, professional resume tailored specifically for the given job description.

STRICT RULES:

1. OUTPUT FORMAT:
- Return ONLY valid JSON
- Do NOT include any explanation or extra text
- Format:
{
  "html": "<complete HTML here>"
}

2. HTML STRUCTURE:
- Use clean semantic HTML: <html>, <head>, <body>
- Use inline CSS only (important for PDF tools like Puppeteer)
- Keep design minimal, professional, and readable
- Use proper sections:
  - Header (Name, Contact, Links)
  - Summary
  - Skills
  - Projects / Experience
  - Education

3. ATS OPTIMIZATION:
- Extract important keywords from job description
- Ensure keywords are naturally included
- Avoid keyword stuffing
- Use standard headings (no fancy names)

4. CONTENT RULES:
- Use strong action verbs (Built, Developed, Optimized, Designed)
- Every project bullet must include measurable impact when possible (%, users, performance)
- Prioritize relevant experience based on job description
- Remove or minimize irrelevant content

5. TONE:
- Human-like, natural, professional
- No generic AI phrases
- No repetition

6. LENGTH:
- Keep resume concise (fit within 1–2 pages)

7. FORMATTING:
- Use bullet points for readability

- DO NOT use <strong> or <b> inside paragraph text or bullet points
- Do NOT highlight keywords inside sentences

- <strong> can ONLY be used for:
  - Section headings (Summary, Skills, Projects, Education)
  - Optional: Skill category labels (Backend, Frontend, etc.)

- Keep all paragraph and bullet content plain text
- Maintain consistent spacing and clean layout

8. IMPORTANT:
- Do NOT hallucinate fake experience
- Use only provided data, but optimize it

Generate the final result now.
`;
        let response;
        let retries = 3;

        while (retries > 0) {
            try {
                response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: prompt,
                    config: {
                        responseMimeType: "application/json",
                        responseSchema: zodToJsonSchema(resumePdfSchema),
                    }
                });
                break;
            } catch (err) {
                if (err.status === 503 && retries > 1) {
                    console.log("Retrying AI request...");
                    await new Promise(res => setTimeout(res, 2000));
                    retries--;
                } else {
                    throw err;
                }
            }
        }

        if (!response) {
            throw new Error("AI service unavailable");
        }
        const jsonMatch = response.text.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("No valid JSON found in Gemini response");
        }

        const jsonContent = JSON.parse(jsonMatch[0]);

        if (!jsonContent.html) {
            throw new Error("Invalid resume HTML from AI");
        }

        const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

        return pdfBuffer;
    } catch (error) {
        console.error("Resume PDF generation failed:", error);
        throw error;
    }
}

module.exports = {
    generateInterviewReport,
    generateResumePdf
}
