import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Card from "../components/Card";

function App() {
  const [mood, setMood] = useState("");
  const [setting, setSetting] = useState("");
  const [films, setFilms] = useState([]);

  const emotions = ["lonely", "serenity", "grief"];
  const specifics = ["neon", "moody", "noir"];

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(mood);
    console.log(setting);
    setFilms([]);
    try {
      const response = await axios.post("http://localhost:5000/api/recommend", {
        mood,
        setting,
      });
      console.log(response);
      setFilms((prevFilms) => [
        ...prevFilms,
        ...response.data.map((data) => data.title),
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <form action="submit">
        <input
          placeholder="How are you feeling?"
          type="text"
          value={[mood, setting]}
          onChange={(e) => setMood(e.target.value)}
          required
        />
        <button onClick={handleSubmit}>Send</button>
      </form>
      <div>
        <h3>Emotions:</h3>
        {emotions.map((emotion) => (
          <button onClick={() => setMood(emotion)}>{emotion}</button>
        ))}
        <h3>Setting:</h3>
        {specifics.map((specific) => (
          <button
            onClick={() => {
              setSetting(specific);
            }}
          >
            {specific}
          </button>
        ))}
      </div>
      {films.map((film) => (
        <Card film={film} />
      ))}
    </div>
  );
}

export default App;
