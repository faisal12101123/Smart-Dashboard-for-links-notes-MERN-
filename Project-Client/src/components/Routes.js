import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import CreateNote from "./CreateNote";
import CreateLink from "./CreateLink";
import NoteView from "./NoteView";
import LinkView from "./LinkView";
import SingleNote from "./SingleNote"
import UpdateNote from "./UpdateNote";
import UpdateLink from "./UpdateLink";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={App} />
                <PrivateRoute path="/createnote" exact component={CreateNote} />
                <PrivateRoute path="/createlink" exact component={CreateLink} />
                <PrivateRoute path="/noteview" exact component={NoteView} />
                <PrivateRoute path="/linkview" exact component={LinkView} />
                <PrivateRoute path="/noteview/:slug" exact component={SingleNote} />
                <PrivateRoute path="/noteview/update/:slug" exact component={UpdateNote} />
                <PrivateRoute path="/linkview/update/:_id" exact component={UpdateLink} />
                <Route path="/login" exact component={Login} />
            </Switch>
        </Router>
    )
};

export default Routes;