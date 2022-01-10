import React, {useState} from 'react';
import {withRouter} from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import {getUsername, getToken} from "./Helpers";
import Footer from "./Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateNote = (props) => {
    const [state, setState] = useState(
        {
          title: "",
          user: getUsername()  
        }
    );

    const [content, setContent] = useState("");

    const handleContent = (event) => {
        setContent(event);
    };

    const {title, user} = state;

    const handleChange = (name) => (event) => {
        setState({...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();

        axios
        .post(`${process.env.REACT_APP_NOTE_POST}/post`, {title, content, user},{
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        })
        .then(response => {

            setState({...state, title: "", user: "" });
            setContent("");
            alert(`Note titled "${response.data.title}" is created.`);
            props.history.push("/noteview");

        })
        .catch(error => {
            alert(error.response.data.error)
        });
    };

  return (
    <div className="container p-5">
    <Nav />
      <br/>
      <h2>Create Note</h2>
      <br/>
      <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label className="text-muted">Title</label>
              <input value={title} onChange={handleChange("title")} type="text" className="form-control" placeholder="Note Title" required />
          </div>
          <div className="form-group">
              <label className="text-muted">Note</label>
              <ReactQuill value={content} onChange={handleContent} className="pb-5 mb-3" theme="snow" placeholder="Note Details..." style={{border: "1px solid #666"}} />
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

export default withRouter(CreateNote);