const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Esta línea permite a Express.js parsear JSON

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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
