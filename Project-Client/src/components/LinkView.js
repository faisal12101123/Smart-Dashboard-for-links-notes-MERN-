import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import {getToken} from "./Helpers";
import Footer from "./Footer";

const LinkView = () => {

    const [links, setLinks] = useState([]);
  
    const fetchLinks = () => {
  
      axios.get(`${process.env.REACT_APP_NOTE_POST}/links`, {
        headers: {
          authorization: `Bearer ${getToken()}`
      }
      })
      .then(response => {
        setLinks(response.data);
      })
      .catch(erroe => alert("Error fetching links"));
    };
  
      useEffect(() => {
        fetchLinks()
      },[]);

      const deleteConfirm = _id => {
        let answer = window.confirm("Are you sure you want to delete the link?");
        if (answer) {
          deletePost(_id);
        }
      };

      const deletePost = _id => {
        axios.delete(`${process.env.REACT_APP_NOTE_POST}/links/${_id}`, {
          headers: {
            authorization: `Bearer ${getToken()}`
        }
        })
        .then(response => {
          alert(response.data.message);
          fetchLinks();
        })
        .catch(error => alert("Error fetching link"));
      };
  
    return (
      <div className="container p-5">
        <Nav />
        <br/>
        <h2>Links</h2>
        <hr/>
        {
          links.map((link, i) => (
            <div className="row" key={link._id} style={{ borderBottom: ".5px solid silver"}}>
              <div className="col pt-3 pb-2">
                <div className="row">
                  <div className="col-md-10">
                  <h4>{link.title}</h4>
                <a class="btn btn-secondary" href={"http://".concat(link.address)} role="button" > {link.title} </a>
                <br/>
                <span>Author:<span className="badge">{link.user}</span> Published on:
                <span className="badge">{new Date(link.createdAt).toLocaleDateString()}</span>
                </span>
                  </div>
                  <div className="col-md-2">
                  <Link to={`/linkview/update/${link._id}`} className="btn btn-sm btn-outline-warning">
                      Update
                    </Link>
                    <button onClick={() => deleteConfirm(link._id)} className="btn btn-sm btn-outline-danger ml-1">Delete</button>
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
  
  export default LinkView;