import React, { useState, useEffect } from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import {getUsername} from "./Helpers";
import Footer from "./Footer";

const App = (props) => {

    const [state, setState] = useState({
      username : "",
      password: ""
  });
  const {username, password} = state;

  useEffect(() => {
    getUsername() && props.history.push("/noteview");
},[]);

  const handleChange = (name) => (event) => {
      setState({...state, [name]: event.target.value });
  };

  const handleSubmit = event => {
      event.preventDefault();

      console.log({username, password});

      axios
      .post(`${process.env.REACT_APP_NOTE_POST}/reg`, {username, password})
      .then(response => {
          setState({...state, username: "", password: ""});
          alert(`"${response.data.username}" is registered.`);
          props.history.push("/login");

      })
      .catch(error => {
          alert(error.response.data.error)
      });
  };

  const registerForm = () => (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label className="text-muted">Username</label>
            <input value={username} onChange={handleChange("username")} type="email" className="form-control" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
            <label className="text-muted">Password</label>
            <input value={password} onChange={handleChange("password")} type="password" className="form-control" placeholder="Enter your password" required />
        </div>
        <div className="form-group">
            <button className="btn btn-secondary">Register</button>
        </div>
    </form>
  );

  return (
      <div className="container p-5">
          <Nav />
          <br/>
          <h2>Register</h2>
          {registerForm()}
          <Footer />
    </div>
  );
}

export default withRouter(App);
