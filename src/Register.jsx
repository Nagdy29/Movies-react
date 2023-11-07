import Axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  let navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: 0,
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
        "https://movies-api.routemisr.com/signup",
        user
      );
      if (data.message === "success") {
        //login
        navigate("/login");
      } else {
        setError(data.message);
      }
    }
  }

  function validateForm() {
    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(12).required(),
      last_name: Joi.string().alphanum().min(3).max(12).required(),
      age: Joi.number().min(15).max(80).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    return schema.validate(user, { abortEarly: false });
  }
  return (
    <>
      <div className="w-75 mx-auto">
        <h1>Register</h1>

        {errorList.map((error) => (
          <div className="alert  py-3 alert-danger">{error.message} </div>
        ))}

        {error.length > 0 ? (
          <div className="alert alert-danger">{error} </div>
        ) : (
          ""
        )}

        <form onSubmit={submitData}>
          <label htmlFor="first_name">first_name: </label>
          <input
            className="form-control p-2 mb-2"
            type="text"
            name="first_name"
            id="first_name"
            onChange={getUserData}
          />

          <label htmlFor="last_name">last_name: </label>
          <input
            className="form-control"
            type="text"
            name="last_name"
            id="last_name"
            onChange={getUserData}
          />

          <label htmlFor="age">age: </label>
          <input
            className="form-control p-2 mb-2"
            type="number"
            name="age"
            id="age"
            onChange={getUserData}
          />

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
            Register{" "}
          </button>
        </form>
      </div>
    </>
  );
};
