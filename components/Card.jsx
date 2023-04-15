import { useState, useEffect } from "react";
import axios from "axios";

function Card({ film }) {
  const [rec, setRec] = useState({});

  useEffect(() => {
    axios
      .get("https://www.omdbapi.com/?apikey=bf6c465&t=" + film)
      .then((res) => {
        console.log(res.data);
        setRec(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3>{rec.Title}</h3>
      <p>{rec.Year}</p>
      <h4>Directed by: {rec.Director}</h4>
      <p>{rec.Plot}</p>
      <img src={rec.Poster} alt="" />
    </div>
  );
}

export default Card;
