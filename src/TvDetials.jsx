import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export const TvDetials = () => {
  const [tvdetial, setTvdetails] = useState(null);
  let prams = useParams();

  async function TvDetails(id) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=375426995ce7faa06248f3056de96e2b&language=en-US`
    );

    setTvdetails(data);
  }
  useEffect(() => {
    TvDetails(prams.id);
  }, []);

  return (
    <>
      <div>
        {tvdetial ? (
          <div className="row my-5">
            <div className="col-md-3">
              <img
                className="w-100"
                src={`https://image.tmdb.org/t/p/w500` + tvdetial.poster_path}
                alt=""
              />
            </div>
            <div className="col-md-9 my-5">
              <h2>{tvdetial.title}</h2>
              <p>{tvdetial.overview}</p>
              <ul>
                <li className="my-2">budget: {tvdetial.budget} </li>
                <li className="my-2">vote_average: {tvdetial.vote_average} </li>
                <li className="my-2">vote_count: {tvdetial.vote_count} </li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
