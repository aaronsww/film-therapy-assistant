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
      setMood("");
    } catch (error) {
      console.error(error);
    }
  };

  const divStyle = {
    backgroundColor: "blue",
    color: "white",
    padding: "10px",
  };

  return (
    <div className="App">
      <form action="submit">
        <input
          placeholder="How are you feeling?"
          type="text"
          value={mood}
          onChange={(e) => setMood(mood + "," + e.target.value)}
          required
        />
        <button onClick={handleSubmit}>Send</button>
      </form>
      <div>
        <h3>Emotions:</h3>
        {emotions.map((emotion) => (
          <button
            style={mood.includes(emotion) ? divStyle : null}
            onClick={() => setMood(mood + "," + emotion)}
          >
            {emotion}
          </button>
        ))}
        <h3>Setting:</h3>
        {specifics.map((specific) => (
          <button
            style={setting === specific ? divStyle : null}
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
