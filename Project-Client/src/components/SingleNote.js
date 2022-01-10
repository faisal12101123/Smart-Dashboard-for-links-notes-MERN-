import React, {useState, useEffect} from "react";
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";
import {getToken} from "./Helpers";
import renderHTML from "react-render-html";


const SingleNote = (props) => {
    const [post, setPost] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_NOTE_POST}/posts/${props.match.params.slug}`, {
            headers: {
              authorization: `Bearer ${getToken()}`
            }
          })
        .then(response => setPost(response.data))
        .catch(error => alert("Error loading single note"));
    },[]);

    return (
        <div className="container p-5">
            <Nav />
            <br/>
            <h2>{post.title}</h2>
            <br/>
            <div className="lead pt-3">{renderHTML(post && post.content)}</div>
            <br/>
            <span>Author:<span className="badge">{post.user}</span> Published on:
            <span className="badge">{new Date(post.createdAt).toLocaleDateString()}</span>
            </span>
            <Footer />
      </div>
    );

};

export default SingleNote;
