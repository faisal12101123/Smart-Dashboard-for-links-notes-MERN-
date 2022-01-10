import React, {useState, useEffect} from "react";
import {Link, withRouter} from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import {authenticate, getUsername} from "./Helpers";
import Footer from "./Footer";

const Login = (props) => {
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

        axios
        .post(`${process.env.REACT_APP_NOTE_POST}/login`, {username, password})
        .then(response => {
            authenticate(response, () => props.history.push("/noteview"));

        })
        .catch(error => {
            alert(error.response.data.error);
        });
    };

    const loginForm = () => (
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
              <button className="btn btn-secondary">Login</button>
          </div>
      </form>
    );

    return (
        <div className="container p-5">
            <Nav />
            <br/>
            <h2>Login</h2>
            {loginForm()}
            <Footer />
      </div>
    );
};

export default withRouter(Login);