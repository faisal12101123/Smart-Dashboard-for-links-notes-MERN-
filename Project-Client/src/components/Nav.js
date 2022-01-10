import React from "react";
import {Link, withRouter} from "react-router-dom";
import {getUsername, logout} from "./Helpers";

const Nav = (props) => {
    return (
    <nav>
                
        {!getUsername() && (

                <ul className="nav nav-tabs">

                <li className="nav-item pr-3 pt-3 pb-3">
                <Link className="nav-link" to="/">Home</Link>
                </li>

                <li className="nav-item ml-auto pr-3 pt-3 pb-3">
                <Link className="nav-link" to="/login">Login</Link>
                </li>

                </ul>
                
            )}

        {getUsername() && (
            <ul className="nav nav-tabs">

            <li className="nav-item pr-3 pt-3 pb-3">
                    <Link className="nav-link" to="/createnote">Create Note</Link>
            </li>

             <li className="nav-item pr-3 pt-3 pb-3">
                    <Link className="nav-link" to="/createlink">Create Web-Link</Link>
            </li>
            
            <li className="nav-item pr-3 pt-3 pb-3">
                    <Link className="nav-link" to="/noteview">Notes</Link>
            </li>

             <li className="nav-item pr-3 pt-3 pb-3">
                    <Link className="nav-link" to="/linkview">Links</Link>
            </li>

            <form className="form-inline my-2 my-lg-0"></form>
            <button onClick={() => logout(() => props.history.push("/login"))} 
            className="ml-auto btn btn-outline-secondary my-2 my-sm-0" type="button">
                Logout
            </button>

            </ul>
        )}       

    </nav>
);

};

export default withRouter(Nav);