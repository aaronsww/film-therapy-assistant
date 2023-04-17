import { useState, useEffect } from "react";
import axios from "axios";
import "../src/App.css";

function Card({ film }) {
  const [rec, setRec] = useState({});

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&t=` + film)
      .then((res) => {
        console.log(res.data);
        setRec(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="card">
      <img className="poster" src={rec.Poster} alt="" />
      <div>
        <div className="year">{rec.Year}</div>
        <div className="name">{rec.Title}</div>
        <div className="dir">Dir. {rec.Director}</div>
        <div className="plot">{rec.Plot}</div>
      </div>
    </div>
  );
}

export default Card;
