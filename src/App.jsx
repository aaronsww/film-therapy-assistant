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

  const emotions = ["euphoria", "serenity", "homesick", "nostalgia", "hype"];
  const serious = ["depression", "anxiety", "grief", "lonely"];
  const specifics = ["neon", "moody", "noir", "neutral", "vibrant"];

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
    backgorundColor: "#dee2e6",
    borderBottom: "5px solid #adb5bd",
    color: "black",
  };

  return (
    <div className="App">
      <div className="quote">
        <span className="quoteMark">"</span>
        <div>In its truest form, cinema is therapy.</div>
        <p>- Nadine Labaki</p>
      </div>
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
      {/* <form action="submit">
        <textarea
          className="storyIp"
          // placeholder="How are you feeling?"
          type="text"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          required
        />
      </form> */}
      <div>
        <div className="ipSection">
          <h3>Emotion(s)</h3>
          {toggle && (
            <div>
              {serious.map((ser, index) => (
                <button
                  className="tab"
                  style={{
                    borderRadius:
                      index === 0
                        ? "4px 0 0 4px"
                        : index === serious.length - 1
                        ? "0 4px 4px 0"
                        : "",
                    ...(mood.includes(ser) ? divStyle : {}),
                  }}
                  onClick={() => setMood(mood + "," + ser)}
                >
                  {ser}
                </button>
              ))}
            </div>
          )}
          {!toggle && (
            <div>
              {emotions.map((emotion, index) => (
                <button
                  className="tab"
                  style={{
                    borderRadius:
                      index === 0
                        ? "4px 0 0 4px"
                        : index === emotions.length - 1
                        ? "0 4px 4px 0"
                        : "",
                    ...(mood.includes(emotion) ? divStyle : {}),
                  }}
                  onClick={() => setMood(mood + "," + emotion)}
                >
                  {emotion}
                </button>
              ))}
            </div>
          )}
        </div>
        {!toggle && (
          <div className="ipSection">
            <h3>Setting</h3>
            <div className="layout">
              <div>
                {specifics.map((specific, index) => (
                  <button
                    className="tab"
                    style={{
                      borderRadius:
                        index === 0
                          ? "4px 0 0 4px"
                          : index === specifics.length - 1
                          ? "0 4px 4px 0"
                          : "",
                      ...(setting.includes(specific) ? divStyle : {}),
                    }}
                    onClick={() => {
                      setSetting(specific);
                    }}
                  >
                    {specific}
                  </button>
                ))}
              </div>
              <button className="submitBtn" onClick={handleSubmit}>
                Send
              </button>
            </div>
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
