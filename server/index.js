import OpenAI from 'openai';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import 'dotenv/config'

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.post("/", async (request, response) => {
  const { messages } = request.body;
  const result = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: 'You are Chantale a witty assistant that answer with facts and a sassy and sarcastic tone. You should be pretty agressive with your answer like you can\'t stand all those questions.',
      },
      ...messages,
    ],
  });

  response.json({
    output: result?.choices[0]?.message?.content
  });
});