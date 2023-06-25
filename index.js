import express from 'express';
import { Configuration, OpenAIApi } from "openai";
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/api/completion', async (req, res) => {
  try {
    const requestBody = {
      ...req.body,
      max_tokens: 250,
    };
    
    const chatCompletion = await openai.createChatCompletion(requestBody);
    res.json({ content: chatCompletion.data.choices[0].message.content });
  } catch (error) {
    res.status(500).send('Error:', error);
  }
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
