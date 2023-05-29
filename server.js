require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");


app.use(cors());
app.use(express.json());



const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get('/server', (req, res) => {
  res.json({
    message: "HELLO KESE HO"
  });
});

app.post('/bot', (req, res) => {
  const query = req.body.query;

  openai.createCompletion({
    model: "text-davinci-003",
    prompt: query,
    max_tokens: 4000,
    temperature: 0.1,
  })
    .then((response) => {
      const answer = response.data.choices[0].text;
      const array = answer.split('\n').filter((value) => value).map(value => value.trim());
      return array;
    })
    .then((answer) => {
      res.json({
        answer,
        question: query
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while processing the request."
      });
    });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 8000");
});
