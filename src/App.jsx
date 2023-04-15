import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Card from "../components/Card";
import { HeartSwitch } from "@anatoliygatt/heart-switch";

function App() {
  const [toggle, setToggle] = useState();
  const [story, setStory] = useState("");
  const [mood, setMood] = useState("");
  const [setting, setSetting] = useState("");
  const [films, setFilms] = useState([]);

  const emotions = ["lonely", "serenity", "grief"];
  const specifics = ["neon", "moody", "noir"];

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(story);
    setFilms([]);
    if (toggle) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/recommend",
          {
            story,
            mood,
            setting,
          }
        );
        console.log(response);
        setFilms((prevFilms) => [
          ...prevFilms,
          ...response.data.map((data) => data.title),
        ]);
        setMood("");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/recommend/help",
          {
            story,
            mood,
            setting,
          }
        );
        console.log(response);
        setFilms((prevFilms) => [
          ...prevFilms,
          ...response.data.map((data) => data.title),
        ]);
        setMood("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const divStyle = {
    backgroundColor: "blue",
    color: "white",
    padding: "10px",
  };

  return (
    <div className="App">
      
      <div className="heart">
        <HeartSwitch
          size="md"
          inactiveTrackFillColor="#cffafe"
          inactiveTrackStrokeColor="#22d3ee"
          activeTrackFillColor="#06b6d4"
          activeTrackStrokeColor="#0891b2"
          inactiveThumbColor="#ecfeff"
          activeThumbColor="#FFC0CB"
          onChange={() => {
            setToggle((toggle) => !toggle);
          }}
        />
      </div>
      <form action="submit">
        <input
          placeholder="How are you feeling?"
          type="text"
          value={story}
          onChange={(e) => setStory(e.target.value)}
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
        {!toggle && (
          <div>
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
        )}
      </div>
      {films.map((film) => (
        <Card film={film} />
      ))}
    </div>
  );
}

export default App;
