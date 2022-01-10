import React, {useState} from 'react';
import {withRouter} from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import {getUsername,getToken} from "./Helpers";
import Footer from "./Footer";

const CreateLink = (props) => {
    const [state, setState] = useState(
        {
          title: "",
          address: "",
          user: getUsername()  
        }
    );

    const {title, address, user} = state;

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
        .post(`${process.env.REACT_APP_NOTE_POST}/address`, {title, address, user},{
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        })
        .then(response => {

            setState({...state, title: "", address: "", user: ""})
            alert(`Link titled "${response.data.title}" is created.`);
            props.history.push("/linkview");

        })
        .catch(error => {
            alert(error.response.data.error)
        });
    }
    };

  return (
    <div className="container p-5">
    <Nav />
      <br/>
      <h2>Create Web-Link</h2>
      <br/>
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
              <button className="btn btn-secondary">Create</button>
          </div>
      </form>
      <Footer />
    </div>
  );
}

export default withRouter(CreateLink);