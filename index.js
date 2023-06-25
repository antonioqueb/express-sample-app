import express from 'express';
import { Configuration, OpenAIApi } from "openai";
import cors from 'cors';
import rateLimit from "express-rate-limit"; // Importa la librería

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Máximo 3 peticiones por día
const apiLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
  max: 4,
  message: "Has excedido el límite de 4 peticiones por día.",
});

// Aplica el middleware a la ruta /api/completion
app.use("/api/completion", apiLimiter);

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
