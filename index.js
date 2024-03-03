require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

const ai = async (prompt) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text
}

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/', async (req, res) => {
    console.log(req.body)
    const response = await ai(req.body)
    res.json(response)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})