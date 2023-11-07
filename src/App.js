import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Home } from "./Home";
import { Movie } from "./Movie";
import { Navvbar } from "./Navvbar";
import { Tv } from "./Tv";
import { Pepole } from "./Pepole";
import { Login } from "./Login.jsx";
import { Register } from "./Register.jsx";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { MoviesDetials } from "./MoviesDetials.jsx";
import { TvDetials } from "./TvDetials.jsx";

function App() {
  let nav = useNavigate();
  const [userData, setUserData] = useState(null);

  function saveData() {
    let encode = localStorage.getItem("userToken");
    let coden = jwtDecode(encode);
    setUserData(coden);
  }
  function Logout() {
    setUserData(null);
    localStorage.removeItem("userToken");
    nav("/login");
  }

  //علشان الريفرش
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveData();
    }
  }, []);
  function ProtectRoute(props) {
    if (localStorage.getItem("userToken") === null) {
      return <Navigate to="/login" />;
    } else {
      return props.children;
    }
  }

  return (
    <div>
      <Navvbar Logout={Logout} userData={userData} />
      <div className="container">
        <Routes>
          <Route
            path="home"
            element={
              <ProtectRoute>
                <Home />
              </ProtectRoute>
            }
          />
          <Route
            path="movie"
            element={
              <ProtectRoute>
                <Movie />
              </ProtectRoute>
            }
          />
          <Route
            path="moviesdetials"
            element={
              <ProtectRoute>
                <MoviesDetials />
              </ProtectRoute>
            }
          >
            <Route
              path=":id"
              element={
                <ProtectRoute>
                  <MoviesDetials />
                </ProtectRoute>
              }
            />
          </Route>
          <Route
            path="tv"
            element={
              <ProtectRoute>
                <Tv />
              </ProtectRoute>
            }
          />

          <Route
            path="tvdetials"
            element={
              <ProtectRoute>
                <TvDetials />
              </ProtectRoute>
            }
          >
            <Route
              path=":id"
              element={
                <ProtectRoute>
                  <TvDetials />
                </ProtectRoute>
              }
            />
          </Route>

          <Route
            path="pepole"
            element={
              <ProtectRoute>
                <Pepole />
              </ProtectRoute>
            }
          />
          <Route path="login" element={<Login saveData={saveData} />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
