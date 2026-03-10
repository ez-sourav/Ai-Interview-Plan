const {GoogleGenAI} = require('@google/genai')

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

async function invokeGeminiAi(){
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: "Hello, GEMINI! Can you tell me a joke about JavaScript?"
    })
    console.log(response.text);
}

module.exports = {
    invokeGeminiAi
}