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
    const requestBody = req.body;
    const chatCompletion = await openai.createChatCompletion(requestBody);
    res.send(chatCompletion.data.choices[0].message);
  } catch (error) {
    res.status(500).send('Error:', error);
  }
});

app.get('/', (req, res) => {
  res.send('Choo Choo! Welcome to your Express app 🚅');
})

app.get("/json", (req, res) => {
  res.json({"Choo Choo": "Welcome to your Express app 🚅"});
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
