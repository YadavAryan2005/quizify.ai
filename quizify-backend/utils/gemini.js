require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const runGemini = async (TOPIC,NUM_QUESTIONS) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Generate a JSON array of multiple-choice questions on the topic: ${TOPIC}.  
The number of questions should be ${NUM_QUESTIONS}.  

Each object in the array must have the following structure:  
{
  "id": number,  
  "question": string,  
  "options": [string, string, string, string],  
  "correctAnswer": number (index of the correct option),  
  "explanation": string  
}  

Rules:  
- Always provide exactly 4 options per question.  
- Ensure only one correct answer.  
- Explanations must be clear and educational.  
- Return only valid JSON (no extra text outside JSON).  
`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response;
};

module.exports = runGemini;