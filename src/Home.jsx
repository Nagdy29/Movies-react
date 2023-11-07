import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [Movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [person, setPerson] = useState([]);

  async function getTranding(medi, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${medi}/week?api_key=375426995ce7faa06248f3056de96e2b`
    );
    callback(data.results.slice(0, 12));
  }
  useEffect(() => {
    getTranding("movie", setMovies);
    getTranding("tv", setTv);
    getTranding("person", setPerson);
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brder  mb-4 w-25"></div>
            <h2 className="h5">
              {" "}
              Trending <br /> Movies <br /> to Watched{" "}
            </h2>

            <p className="text-secondary">TO Trending Movies</p>

            <div className="brder mt-4"></div>
          </div>
        </div>
        {Movies.map((movie, i) => (
          <div className="col-md-2" key={i}>
            <div>
              <Link to={`/moviesdetials/${movie.id}`}>
                {" "}
                <img
                  className="w-75"
                  src={`https://image.tmdb.org/t/p/w500` + movie.poster_path}
                  alt=""
                />
                <h3 className="h6 py-1">{movie.title}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="row ">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brder  mb-4 w-25"></div>
            <h2 className="h5">
              {" "}
              Trending <br /> Tv <br /> to Watched{" "}
            </h2>

            <p className="text-secondary">TO Trending Tv</p>

            <div className="brder mt-4"></div>
          </div>
        </div>
        {tv.map((tv, i) => (
          <div className="col-md-2" key={i}>
            <div>
              <img
                className="w-75"
                src={`https://image.tmdb.org/t/p/w500` + tv.poster_path}
                alt=""
              />
              <h3 className="h6 py-1">{tv.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brder  mb-4 w-25"></div>
            <h2 className="h5">
              {" "}
              Trending <br /> Person <br /> to Watched{" "}
            </h2>

            <p className="text-secondary">TO Trending Person</p>

            <div className="brder mt-4"></div>
          </div>
        </div>
        {person.map((person, i) => (
          <div className="col-md-2" key={i}>
            <div>
              <img
                className="w-75"
                src={`https://image.tmdb.org/t/p/w500` + person.profile_path}
                alt=""
              />
              <h3 className="h6 py-1">{person.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
