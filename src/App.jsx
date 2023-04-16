import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import { HeartSwitch } from "@anatoliygatt/heart-switch";

function App() {
  const [toggle, setToggle] = useState();
  const [story, setStory] = useState("");
  const [mood, setMood] = useState("");
  const [setting, setSetting] = useState("");
  const [films, setFilms] = useState([]);
  const [showForm, setShowForm] = useState();

  const emotions = [
    "euphoria",
    "serenity",
    "homesick",
    "nostalgia",
    "adrenaline",
  ];
  const serious = ["gloom", "anxiety", "grief", "lonely", "insomnia"];
  const specifics = [
    "neon",
    "earthy",
    "noir",
    "vintage",
    "neutral tones",
    "vibrant",
  ];

  const handleSubmit = async (event) => {
    console.log("setting:", setting);
    event.preventDefault();
    setFilms([]);
    if (!mood && !setting && !story) alert("Please select an attribute.");
    else {
      if (!toggle) {
        try {
          console.log(setting);
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
          setShowForm(false);
        } catch (error) {
          console.error(error);
        }
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
      <div>
        <div className="ipSection">
          <h3>Emotion[s]</h3>
          <div>
            {toggle &&
              serious.map((ser, index) => (
                <CustomButton
                  dataSet={serious}
                  data={ser}
                  index={index}
                  mood={mood}
                  setMood={setMood}
                />
              ))}
          </div>
          <div>
            {!toggle &&
              emotions.map((emotion, index) => (
                <CustomButton
                  dataSet={emotions}
                  data={emotion}
                  index={index}
                  mood={mood}
                  setMood={setMood}
                />
              ))}
          </div>
          {toggle && (
            <h3 className="tell" onClick={() => setShowForm(true)}>
              Tell us your story →
            </h3>
          )}
          {toggle && showForm && (
            <form action="submit">
              <textarea
                className="storyIp"
                placeholder="Eg: My girlfriend dumped me, my dog passed away, etc."
                type="text"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                required
              />
            </form>
          )}
        </div>
        {!toggle && (
          <div>
            <div className="ipSection">
              <h3>Color Palette</h3>
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
                      onClick={() => setSetting(specific)}
                    >
                      {specific}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <button className="submitBtn" onClick={handleSubmit}>
          Send
        </button>
      </div>
      {films.map((film) => (
        <Card film={film} />
      ))}
    </div>
  );
}

export default App;
