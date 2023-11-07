import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export const Pepole = () => {
  const [person, setPerson] = useState([]);
  let nums = new Array(15).fill(1).map((ele, index) => index + 1);

  async function getTranding(pageN) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=375426995ce7faa06248f3056de96e2b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageN}`
    );
    setPerson(data.results);
  }
  useEffect(() => {
    getTranding(1);
  }, []);
  return (
    <>
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
