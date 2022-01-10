import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {getUsername} from "./Helpers";

const PrivateRoute = ({ component : Component, ...rest }) => {
    return (
        <Route
        { ...rest }
        render = { props =>
        getUsername() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "./login", state: { from: props.location } }} />
        )

        }

        />
    );
};

export default PrivateRoute;