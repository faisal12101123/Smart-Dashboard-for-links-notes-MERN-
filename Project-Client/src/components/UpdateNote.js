import React, {useState, useEffect} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import {getToken} from "./Helpers";
import Footer from "./Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateNote = (props) => {
    const [state, setState] = useState({
        title: "",
        user: "",
        slug: ""
    });

    const {title, user, slug} = state;

    const [content, setContent] = useState("");

    const handleContent = (event) => {
        setContent(event);
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NOTE_POST}/posts/${props.match.params.slug}`, {
            headers: {
              authorization: `Bearer ${getToken()}`
            }
          })
        .then(response => {
            const {title, content, slug, user} = response.data;
            setState({...state, title, slug, user});
            setContent(content);
        })
        .catch(error => alert("Error loading single note"));
    },[]);

    const handleChange = (name) => (event) => {
        setState({...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();

        axios
        .put(`${process.env.REACT_APP_NOTE_POST}/posts/${props.match.params.slug}`, {title, content, user}, {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        })
        .then(response => {
            const {title, user, content, slug} = response.data;
            setState({...state, title, user, slug });
            setContent(content);
            alert(`Note titled "${title}" is updated.`);
            props.history.push("/noteview");

        })
        .catch(error => {
            alert(error.response.data.error)
        });
    };

    const showUpdateForm = () => (
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

export default withRouter(UpdateNote);
