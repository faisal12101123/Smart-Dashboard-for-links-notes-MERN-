import React, {useState, useEffect} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import {getToken} from "./Helpers";
import Footer from "./Footer";

const UpdateLink = (props) => {
    const [state, setState] = useState({
        title: "",
        address: "",
        user: ""
    });

    const {title, address, user} = state;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NOTE_POST}/links/${props.match.params._id}`, {
            headers: {
              authorization: `Bearer ${getToken()}`
            }
          })
        .then(response => {
            const {title, address, user} = response.data;
            setState({...state, title, address, user});
        })
        .catch(error => alert("Error loading single link"));
    },[]);

    const handleChange = (name) => (event) => {
        setState({...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();

        const re = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (!re.test(address)) { 
            alert("Wrong Address!!!");
        } else {

        axios
        .put(`${process.env.REACT_APP_NOTE_POST}/links/${props.match.params._id}`, {title, address, user}, {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        })
        .then(response => {
            const {title, user, address} = response.data;
            setState({...state, title, address, user})
            alert(`Link titled "${response.data.title}" is updated.`);
            props.history.push("/linkview");

        })
        .catch(error => {
            alert(error.response.data.error)
        });
    }
    };

    const showUpdateForm = () => (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label className="text-muted">Title</label>
              <input value={title} onChange={handleChange("title")} type="text" className="form-control" placeholder="Web Link Name" required />
          </div>
          <div className="form-group">
              <label className="text-muted">Link Address</label>
              <input value={address} onChange={handleChange("address")} type="text" className="form-control" placeholder="Link Address" required />
          </div>
          <div className="form-group">
              <label className="text-muted">Username</label>
              <input value={user} type="text" className="form-control" placeholder="Username" required />
          </div>
          <div className="form-group">
              <button className="btn btn-primary">Update</button>
          </div>
      </form>
    );

    return (
        <div className="container p-5">
            <Nav />
            <br/>
            <h2>{title}</h2>
            {showUpdateForm()}
            <Footer />
      </div>
    );

};

export default withRouter(UpdateLink);
