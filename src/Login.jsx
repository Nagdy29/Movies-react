import Axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  let navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;

    setUser(myUser);
  }
  async function submitData(e) {
    e.preventDefault();
    let validationResult = validateForm;
    if (validationResult.error) {
      setErrorList(validationResult.error.details);
    } else {
      let { data } = await Axios.post(
        "https://movies-api.routemisr.com/signin",
        user
      );
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        props.saveData();
        navigate("/home");
      } else {
        setError(data.message);
      }
    }
  }

  function validateForm() {
    let schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    return schema.validate(user, { abortEarly: false });
  }
  return (
    <>
      <div className="w-75 mx-auto">
        <h1>Login</h1>

        {errorList.map((error) => (
          <div className="alert  py-3 alert-danger">{error.message} </div>
        ))}

        {error ? <div className="alert alert-danger">{error} </div> : ""}

        <form onSubmit={submitData}>
          <label htmlFor="email">email: </label>
          <input
            className="form-control p-2 mb-2"
            type="email"
            name="email"
            id="email"
            onChange={getUserData}
          />

          <label htmlFor="password">password: </label>
          <input
            className="form-control p-2 mb-2"
            type="password"
            name="password"
            id="password"
            onChange={getUserData}
          />

          <button className="btn btn-outline-info m-4 text-white">
            Login{" "}
          </button>
        </form>
      </div>
    </>
  );
};
