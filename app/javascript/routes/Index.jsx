import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SystemPosts from "../components/SystemPosts";

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={SystemPosts} />
        </Switch>
    </Router>
);