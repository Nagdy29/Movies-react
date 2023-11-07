import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const MoviesDetials = () => {
  const [movdetial, setmovdetial] = useState(null);
  let prams = useParams();

  async function moviedetails(id) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=375426995ce7faa06248f3056de96e2b&language=en-US`
    );

    setmovdetial(data);
  }
  useEffect(() => {
    moviedetails(prams.id);
  }, []);
  return (
    <>
      <div>
        {movdetial ? (
          <div className="row my-5">
            <div className="col-md-3">
              <img
                className="w-100"
                src={`https://image.tmdb.org/t/p/w500` + movdetial.poster_path}
                alt=""
              />
            </div>
            <div className="col-md-9 my-5">
              <h2>{movdetial.title}</h2>
              <p>{movdetial.overview}</p>
              <ul>
                <li className="my-2">budget: {movdetial.budget} </li>
                <li className="my-2">
                  vote_average: {movdetial.vote_average}{" "}
                </li>
                <li className="my-2">vote_count: {movdetial.vote_count} </li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
