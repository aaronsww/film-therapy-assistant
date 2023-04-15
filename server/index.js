import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Configuration, OpenAIApi } from "openai";

const app = express();
app.use(express.json());

app.use(cors());

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

mongoose
  .connect("mongodb://0.0.0.0:27017/hackTest")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to Mongodb...", err));

const movieSchema = new mongoose.Schema({
  title: String,
});

const Movie = mongoose.model("Movie", movieSchema);

app.post("/api/recommend", async (req, res) => {
  console.log("Received POST request");
  try {
    const { mood } = req.body;

    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `I feel ${mood}. Recommend me 5 films. Reply with just the film titles seperated by a comma.`,
          },
        ],
      })
      .then(async (rez) => {
        console.log(rez.data.choices[0].message.content);
        const response = rez.data.choices[0].message.content.split(", ");
        const savedRecommendations = await Movie.create(
          response.map((title) => ({ title }))
        );
        res.status(200).send(savedRecommendations);
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/api/recommendations", async (req, res) => {
  const movies = await Movie.find();
  console.log(movies);
  return res.json(movies);
});

app.listen(5000, () => console.log("Listening on port 5000"));

// const response = await openai.completions.create({
//   model: "text-davinci-002",
//   prompt: `I am feeling ${mood}. Recommend 5 movies for me.`,
//   maxTokens: 256,
//   n: 5,
//   stop: ["\n"],
// });

// const response = await createChatCompletion({
//     model: "text-davinci-002",
//     prompt: `I am feeling ${mood}. Recommend 5 movies for me.`,
//     maxTokens: 256,
//     n: 5,
//     stop: ["\n"],
//   });
