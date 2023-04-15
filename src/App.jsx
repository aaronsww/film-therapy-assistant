import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Card from "../components/Card";

function App() {
  const [mood, setMood] = useState("");
  const [films, setFilms] = useState([]);

  const handleSubmit = async (event) => {
    setFilms([]);
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/recommend", {
        mood,
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
      <input
        placeholder="How are you feeling?"
        type="text"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
      <button onClick={handleSubmit}>Send</button>
      {films.map((film) => (
        <Card film={film} />
      ))}
    </div>
  );
}

export default App;
