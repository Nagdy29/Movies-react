import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export const Movie = () => {
  const [Movies, setMovies] = useState([]);

  async function getTranding(pageN) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=375426995ce7faa06248f3056de96e2b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageN}`
    );
    setMovies(data.results);
  }
  useEffect(() => {
    getTranding(1);
  }, []);

  let nums = new Array(15).fill(1).map((ele, index) => index + 1);
  return (
    <>
      {getTranding ? (
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
                    className="w-100 my-3"
                    src={`https://image.tmdb.org/t/p/w500` + movie.poster_path}
                    alt=""
                  />
                  <h3 className="h6 py-1">{movie.title}</h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <AiOutlineLoading3Quarters className="w-100" />
      )}

      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center d-flex ">
          <li class="page-item disabled">
            <a class="page-link">Previous</a>
          </li>
          {nums.map((ele) => (
            <>
              <li class="page-item" onClick={() => getTranding(ele)}>
                <a class="page-link">{ele}</a>
              </li>
            </>
          ))}
        </ul>
      </nav>
    </>
  );
};
