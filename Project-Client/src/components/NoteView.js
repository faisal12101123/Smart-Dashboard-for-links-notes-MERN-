import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import {getToken} from "./Helpers";
import Footer from "./Footer";
import renderHTML from "react-render-html";

const NoteView = () => {

    const [posts, setPosts] = useState([]);
  
    const fetchPosts = () => {
  
      axios.get(`${process.env.REACT_APP_NOTE_POST}/posts`, {
        headers: {
          authorization: `Bearer ${getToken()}`
      }
      })
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => alert("Error fetching notes"));
    };
  
      useEffect(() => {
        fetchPosts()
      },[]);

      const deleteConfirm = slug => {
        let answer = window.confirm("Are you sure you want to delete the note?");
        if (answer) {
          deletePost(slug);
        }
      };

      const deletePost = slug => {
        axios.delete(`${process.env.REACT_APP_NOTE_POST}/posts/${slug}`, {
          headers: {
            authorization: `Bearer ${getToken()}`
        }
        })
        .then(response => {
          alert(response.data.message);
          fetchPosts();
        })
        .catch(error => alert("Error fetching note"));
      };
  
    return (
      <div className="container p-5">
        <Nav />
        <br/>
        
        <h2>Notes</h2>
        
        <hr/>
        {
          posts.map((post, i) => (
            <div className="row" key={post._id} style={{ borderBottom: ".5px solid silver"}}>
              <div className="col pt-3 pb-2">
                <div className="row">
                  <div className="col-md-10">
                    <Link className="nav-link" to={`/noteview/${post.slug}`}>
                    <h4>{post.title}</h4>
                    </Link>
                    <div className="lead pt-3">{renderHTML(post.content.substring(0, 50))}</div>
                      <span>Author:<span className="badge">{post.user}</span> Published on:
                    <span className="badge">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>
                  <div className="col-md-2">
                    <Link to={`/noteview/update/${post.slug}`} className="btn btn-sm btn-outline-warning">
                      Update
                    </Link>
                    <button onClick={() => deleteConfirm(post.slug)} className="btn btn-sm btn-outline-danger ml-1">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
        <Footer />
      </div>
    );
  };
  
  export default NoteView;